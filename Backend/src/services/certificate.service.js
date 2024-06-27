const {
  BadRequestError,
  InternalServerError,
} = require("../core/error.response");
const Certificate = require("../models/certificate.model");
const CertRequest = require("../models/certRequest.model");
const PublicKeyUsed = require("../models/publicKeyUsed.model");
const crypto = require("crypto");
const pickFields = require("../utils/pickFields");
const axios = require("axios");
const fs = require("fs");
const CAModel = require("../models/CA.model");
const forge = require("node-forge");
const UserInfo = require("../models/userInfo.model");
const User = require("../models/user.model");
const deletedCertModel = require("../models/deletedCert.model");
const Subscription = require("../models/subscription.model");
const { sendMail } = require("./email.service");
const SigningHistory = require("../models/signingHistory.model");
const { putPubKey, getPubKey } = require("./cache.service");
const constants = {
  idApi: "https://api.fpt.ai/vision/idr/vnm",
  faceApi: "https://api.fpt.ai/dmp/checkface/v1/",
  apiKey: "api-key",
  apiKeyValue: "UCX1X6G3x9blzxGazvo1wdGJhgAe8Nco",
  image: "image",
};

function getModulusLength(rsaKey) {
  const n = rsaKey.n;
  const modulusHex = n.toString(16);
  const modulusLengthInBits = modulusHex.length * 4;
  return modulusLengthInBits;
}

const checkKeyLength = async (user, publicKey) => {
  try {
    const key = forge.pki.publicKeyFromPem(publicKey);
    const modLength = getModulusLength(key);
    const foundSubscription = await Subscription.findOne({
      user: user._id,
    }).populate("plan");
    if (!foundSubscription.plan.isDefault && foundSubscription.end < Date.now())
      throw new Error("SubEnded");
    const validModuleLength =
      foundSubscription.plan.name === "standard" ? 2048 : 4096;
    if (modLength < validModuleLength - 5 || modLength > validModuleLength + 5)
      throw new Error();
    return key;
  } catch (err) {
    if (err.message === "SubEnded")
      throw new BadRequestError(
        "Gói của bạn đã hết hạn, vui lòng huỷ hoặc gia hạn để tiếp tục sử dụng hệ thống",
        "Gói của bạn đã hết hạn, vui lòng huỷ hoặc gia hạn để tiếp tục sử dụng hệ thống"
      );
    throw new BadRequestError(
      "Khoá công khai không hợp lệ, vui lòng thử lại",
      "Khoá công khai không hợp lệ, vui lòng thử lại"
    );
  }
};

class CertificateService {
  static checkPublicKey = async (user, publicKey) => {
    const publicKeyObj = await checkKeyLength(user, publicKey);
    const originMessage = crypto.randomBytes(64).toString("hex");
    const encryptedMessage = forge.util.encode64(
      publicKeyObj.encrypt(originMessage)
    );
    const token = crypto.randomBytes(32).toString("hex");

    const userIdString = user._id.toString();

    const data = {
      token,
      publicKey: publicKey,
      message: originMessage,
      verified: false,
    };

    putPubKey(userIdString, data);

    return { token, encryptedMessage };
  };

  static verifyMessage = async (user, decrypted) => {
    const userIdString = user._id.toString();
    const cachedData = getPubKey(userIdString);
    if (cachedData !== decrypted)
      throw new BadRequestError(
        "Public key và private key không phải là một cặp, xin vui lòng thử lại",
        "Public key và private key không phải là một cặp, xin vui lòng thử lại"
      );

    cachedData.verified = true;
    putPubKey(userIdString, cachedData);
    return true;
  };

  static certificateRequest = async (user, info, { CCCD, face, CCCDBack }) => {
    const foundInfo = await UserInfo.findById(user.userInfo);
    if (foundInfo.verified)
      throw new BadRequestError(
        "Bạn đã có chứng chỉ trước đó rồi, nếu hết hạn, hãy yêu cầu gia hạn"
      );
    if (foundInfo.email !== info.email.toLowerCase())
      throw new BadRequestError(
        "Email bạn nhập không hợp lệ",
        "Email bạn nhập không hợp lệ"
      );
    //check if id number used by another
    const inf = await UserInfo.findOne({ CCCD: info.IdNum });
    if (inf !== null)
      throw new BadRequestError(
        "Căn cước đã được sử dụng bởi người khác, vui lòng liên hệ cơ quan CA để biết thêm chi tiết",
        "Căn cước đã được sử dụng bởi người khác, vui lòng liên hệ cơ quan CA để biết thêm chi tiết"
      );
    //
    const foundRequest = await CertRequest.findOne({
      userId: user._id,
      status: "PENDING",
    });
    if (foundRequest)
      throw new BadRequestError(
        "Bạn đã yêu cầu 1 chứng chỉ từ trước đó rồi",
        "Bạn đã yêu cầu 1 chứng chỉ từ trước đó rồi"
      );
    const foundCert = await Certificate.findOne({ userId: user._id });
    if (foundCert && foundCert.certPem !== null)
      throw new BadRequestError(
        "Bạn đã có chứng chỉ rồi, vui lòng hủy chứng chỉ cũ trước khi yêu cầu 1 chứng chỉ mới",
        "Bạn đã có chứng chỉ rồi, vui lòng hủy chứng chỉ cũ trước khi yêu cầu 1 chứng chỉ mới"
      );

    const token = info.token;
    const { publicKey, verified } = getPubKey(user._id.toString());
    if (!verified)
      throw new BadRequestError(
        "Public key chưa được kiểm tra",
        "Public key chưa được kiểm tra"
      );
    const hash = crypto.createHash("sha256");
    hash.update(publicKey);
    const result = hash.digest("hex");
    const keyUsed = await PublicKeyUsed.findOne({ publicHashed: result });
    if (keyUsed)
      throw new BadRequestError(
        "Có lỗi xảy ra, vui lòng thử lại",
        "Có lỗi xảy ra, vui lòng thử lại"
      );
    //face check
    const CCCD64 = fs.readFileSync(CCCD.path, "base64");
    const face64 = fs.readFileSync(face.path, "base64");
    let faceData = {};
    const formData = new FormData();
    formData.append("file[]", CCCD64);
    formData.append("file[]", face64);
    try {
      faceData = await axios.post(constants.faceApi, formData, {
        headers: {
          [constants.apiKey]: constants.apiKeyValue,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      throw new BadRequestError(
        `Can't request certificate`,
        "Face image or id card image is invalid"
      );
    }
    if (!faceData.data.data.isMatch || faceData.data.data.isBothImgIDCard)
      throw new BadRequestError(
        `Can't request certificate`,
        "Face image is invalid"
      );
    // Id check;
    let idData = {};
    let idFormData = new FormData();
    idFormData.append("image_base64", CCCD64);
    try {
      idData = await axios.post(constants.idApi, idFormData, {
        headers: {
          [constants.apiKey]: constants.apiKeyValue,
        },
      });
    } catch (err) {
      throw new BadRequestError(
        `Can't request certificate`,
        "Ảnh căn cước không hợp lệ"
      );
    }
    const received = idData.data.data[0];
    if (info.IdNum !== received.id)
      throw new BadRequestError(
        `Can't request certificate`,
        "Ảnh căn cước không hợp lệ"
      );
    const fullName = `${info.lastName} ${info.firstName}`.toUpperCase();
    if (fullName !== received.name)
      throw new BadRequestError(
        `Can't request certificate`,
        "Tên không đúng với tên trong căn cước"
      );

    //check date of birth, nationality, home(placeOfOrigin), address

    //end

    const newReq = await CertRequest.create({
      publicKey: publicKey,
      firstName: info.firstName,
      lastName: info.lastName,
      address: info.address,
      gender: info.gender,
      dateOfBirth: info.dateOfBirth,
      nationality: info.nationality,
      phone: info.phone,
      email: info.email,
      userId: user._id,
      face: face.filename,
      CCCD: CCCD.filename,
      CCCDBack: CCCDBack.filename,
      IdNum: info.IdNum,
    });
    await PublicKeyUsed.create({ publicHashed: result });

    return pickFields(newReq._doc, ["publicKey", "firstName", "lastName"]);
  };

  static getCertRequests = async () => {
    const requests = await CertRequest.find({ status: "PENDING" });

    const users = await Promise.all(
      requests.map((e) => {
        return User.findById(e._doc.userId).populate([
          { path: "userInfo", model: "UserInfo" },
          {
            path: "subscription",
            model: "Subscription",
            populate: {
              path: "plan",
            },
          },
        ]);
      })
    );
    // console.log(users.map((e) => e.subscription.plan.name));
    const result = requests.map(({ _doc: e }, index) => {
      const element = { ...e };
      element.subscription = users[index].subscription.plan.name;
      element.subscriptionEnd = users[index].subscription.end;
      if (e.isExtend) {
        element.firstName = users[index].userInfo.firstName;
        element.lastName = users[index].userInfo.lastName;
        element.address = users[index].userInfo.address;
        element.gender = users[index].userInfo.gender;
        element.dateOfBirth = users[index].userInfo.dateOfBirth;
        element.nationality = users[index].userInfo.nationality;
        element.phone = users[index].userInfo.phoneNumber;
        element.email = users[index].userInfo.email;
        element.IdNum = users[index].userInfo.CCCD;
      }
      return element;
    });
    return result;
  };

  static signCertificate = async (userId, certPem, isExtend) => {
    let foundCert = await Certificate.findOne({ userId });
    foundCert.certPem = certPem;
    await foundCert.save();
    const foundRequest = await CertRequest.findOne({
      userId,
      isExtend,
      status: "PENDING",
    });
    foundRequest.status = "SUCCESS";
    await foundRequest.save();
    const foundUser = await User.findById(userId);
    const foundInfo = await UserInfo.findById(foundUser.userInfo);
    if (!foundRequest.isExtend) {
      foundInfo.firstName = foundRequest.firstName;
      foundInfo.lastName = foundRequest.lastName;
      foundInfo.email = foundRequest.email;
      foundInfo.address = foundRequest.address;
      foundInfo.phoneNumber = foundRequest.phone;
      foundInfo.CCCD = foundRequest.IdNum;
      foundInfo.gender = foundRequest.gender;
      foundInfo.dateOfBirth = foundRequest.dateOfBirth;
      foundInfo.nationality = foundRequest.nationality;
      foundInfo.verified = true;
      await foundInfo.save();
    }

    SigningHistory.create({
      user: foundRequest.userId,
      action: "SIGNED",
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    sendMail({ to: foundInfo.email, certificate: true }).catch((err) =>
      console.log(err)
    );

    return "Sign certificate success";
  };

  static rejectSign = async (id, reason) => {
    const foundRequest = await CertRequest.findById(id);
    if (!foundRequest)
      throw new BadRequestError("Không tìm thấy certificate request");
    foundRequest.rejectedReason = reason;
    foundRequest.status = "REJECTED";
    const result = await foundRequest.save();
    let mail;
    if (!foundRequest.isExtend) mail = foundRequest.email;
    else {
      const foundUser = await User.findById(foundRequest.userId).populate(
        "userInfo"
      );
      mail = foundUser.userInfo.email;
    }
    SigningHistory.create({
      user: foundRequest.userId,
      action: "REJECTED",
    }).then((data) => console.log(data));
    sendMail({ to: mail, certificate: true }).catch((err) => console.log(err));
    return result;
  };
  static getMyCertRequest = async (user) => {
    const foundCertRequest = await CertRequest.find({
      userId: user._id,
    });
    if (!foundCertRequest)
      throw new BadRequestError(
        "Bạn không có yêu cầu chứng chỉ nào",
        "Bạn không có yêu cầu chứng chỉ nào"
      );
    return foundCertRequest;
  };

  static checkCertificate = async (certPem) => {
    const foundCA = await CAModel.findOne({ name: "KnB root CA" });
    if (!foundCA)
      throw new InternalServerError(
        "Có lỗi xảy ra, vui lòng thử lại sau",
        "Có lỗi xảy ra, vui lòng thử lại sau"
      );
    try {
      const CA_Cert = forge.pki.certificateFromPem(foundCA.certificate);
      const checkingCert = forge.pki.certificateFromPem(certPem);
      if (new Date(checkingCert.validity.notAfter) < new Date())
        throw new Error();
      const result = CA_Cert.verify(checkingCert);
    } catch (e) {
      throw new BadRequestError(
        "Chứng chỉ không hợp lệ hoặc hết hạn",
        "Chứng chỉ không hợp lệ hoặc hết hạn"
      );
    }
    const foundDeletedCert = await deletedCertModel.findOne({
      certificate: certPem,
    });
    if (foundDeletedCert)
      throw new BadRequestError("Chứng chỉ đã bị huỷ", "Chứng chỉ đã bị huỷ");

    return "Chứng chỉ hợp lệ";
  };

  static getMyCertificate = async (userId) => {
    const foundCert = await Certificate.findOne({ userId });
    if (!foundCert)
      throw new InternalServerError(
        "Get certificate failed",
        "Lỗi không xác định"
      );
    if (!foundCert.certPem)
      throw new BadRequestError(
        "Get certificate failed",
        "Bạn chưa có chứng chỉ nào"
      );
    return foundCert.certPem;
  };

  static extendCert = async (user, publicKey) => {
    const foundCertRequest = await CertRequest.findOne({
      userId: user._id,
      status: "PENDING",
    });
    if (foundCertRequest)
      throw new BadRequestError(
        "Bạn đang có yêu cầu trước đó rồi",
        "Bạn đang có yêu cầu trước đó rồi"
      );

    const foundCert = await Certificate.findOne({ userId: user._id });
    if (foundCert && foundCert.certPem) {
      // nếu chứng chỉ đã tồn tại và còn hạn
      const certificate = forge.pki.certificateFromPem(foundCert.certPem);
      if (new Date(certificate.validity.notAfter) > new Date())
        throw new BadRequestError(
          "Bạn có chứng chỉ đang còn hạn, không thể gia hạn"
        );
    }
    if (!publicKey)
      throw new BadRequestError(
        "Cần cung cấp public key",
        "Cần cung cấp public key"
      );
    await checkKeyLength(user, publicKey);

    const foundInfo = await UserInfo.findById(user.userInfo);
    if (!foundInfo.verified)
      throw new BadRequestError(
        "Tài khoản chưa được xác thực bởi CA",
        "Tài khoản chưa được xác thực bởi CA"
      );

    const hash = crypto.createHash("sha256");
    hash.update(publicKey);
    const result = hash.digest("hex");
    const keyUsed = await PublicKeyUsed.findOne({ publicHashed: result });
    if (keyUsed) throw new BadRequestError("Có lỗi xảy ra, vui lòng thử lại");
    await PublicKeyUsed.create({ publicHashed: result });

    await CertRequest.create({
      publicKey: publicKey,
      userId: user._id,
      isExtend: true,
    });
    return "Yêu cầu cấp lại chứng chỉ thành công";
  };

  static deleteCert = async (id) => {
    const foundCert = await Certificate.findById(id);
    if (!foundCert) throw new BadRequestError(foundCert);

    const newDeletedCert = await deletedCertModel.create({
      certificate: foundCert.certPem,
      userId: foundCert.userId,
    });
    foundCert.certPem = null;
    await foundCert.save();
    return newDeletedCert;
  };
  static getListCert = async () => {
    const certList = await Certificate.find({
      certPem: { $ne: null },
    }).populate({
      path: "userId",
      model: "User",
    });

    const result = certList.map((e) => {
      const obj = {};
      obj._id = e._doc._id;
      obj.certPem = e._doc.certPem;
      obj.userId = e._doc.userId._id;
      obj.userName = e._doc.userId.userName;
      obj.iAt = e._doc.updatedAt;
      return obj;
    });

    return result;
  };
}

module.exports = CertificateService;
