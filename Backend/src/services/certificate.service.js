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
const omitFields = require("../utils/omitFields");
const UserInfo = require("../models/userInfo.model");
const User = require("../models/user.model");
const constants = {
  idApi: "https://api.fpt.ai/vision/idr/vnm",
  faceApi: "https://api.fpt.ai/dmp/checkface/v1/",
  apiKey: "api-key",
  apiKeyValue: "UCX1X6G3x9blzxGazvo1wdGJhgAe8Nco",
  image: "image",
};
class CertificateService {
  static certificateRequest = async (user, info, { CCCD, face, CCCDBack }) => {
    const foundInfo = await UserInfo.findById(user.userInfo);
    if (foundInfo.verified)
      throw new BadRequestError(
        "Bạn đã có chứng chỉ trước đó rồi, nếu hết hạn, hãy yêu cầu gia hạn"
      );
    const foundRequest = await CertRequest.findOne({
      userId: user._id,
      status: "PENDING",
    });
    if (foundRequest)
      throw new BadRequestError(
        "Request sign certificate failed",
        "Bạn đã yêu cầu 1 chứng chỉ từ trước đó rồi"
      );
    const foundCert = await Certificate.findOne({ userId: user._id });
    if (foundCert.certPem !== null)
      throw new BadRequestError(
        "Request sign certificate failed",
        "Bạn đã có chứng chỉ rồi, vui lòng hủy chứng chỉ cũ trước khi yêu cầu 1 chứng chỉ mới"
      );
    const hash = crypto.createHash("sha256");
    hash.update(info.publicKey);
    const result = hash.digest("hex");
    const keyUsed = await PublicKeyUsed.findOne({ publicHashed: result });
    if (keyUsed)
      throw new BadRequestError(
        "Request certificate failed",
        "Some thing wrong, please try again"
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
        "Id card id invalid"
      );
    }
    const received = idData.data.data[0];
    if (info.IdNum !== received.id)
      throw new BadRequestError(`Can't request certificate`, "ID is invalid");
    const fullName = `${info.lastName} ${info.firstName}`.toUpperCase();
    if (fullName !== received.name)
      throw new BadRequestError(
        `Can't request certificate`,
        "ID is invalid name"
      );

    //check date of birth, nationality, home(placeOfOrigin), address
    //end
    // await changeUserInfo(user, { ...info });

    const newReq = await CertRequest.create({
      publicKey: info.publicKey,
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
    console.log(users.map((e) => e.subscription.plan.name));
    const result = requests.map(({ _doc: e }, index) => {
      const element = { ...e };
      element.subscription = users[index].subscription.plan.name;
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

  static signCertificate = async (userId, certPem) => {
    const foundCert = await Certificate.findOne({ userId });
    foundCert.certPem = certPem;
    await foundCert.save();
    const foundRequest = await CertRequest.findOne({ userId });
    foundRequest.status = "SUCCESS";
    await foundRequest.save();
    const foundUser = await User.findById(userId);
    if (!foundRequest.isExtend) {
      const foundInfo = await UserInfo.findById(foundUser.userInfo);
      foundInfo.firstName = foundRequest.firstName;
      foundInfo.lastName = foundRequest.lastName;
      foundInfo.email = foundRequest.email;
      foundInfo.address = foundRequest.address;
      foundInfo.phoneNumber = foundRequest.phoneNumber;
      foundInfo.CCCD = foundRequest.IdNum;
      foundInfo.gender = foundRequest.gender;
      foundInfo.dateOfBirth = foundRequest.dateOfBirth;
      foundInfo.nationality = foundRequest.nationality;
      foundInfo.verified = true;
      await foundInfo.save();
    }
    return "Sign certificate success";
  };

  static getMyCertRequest = async (user) => {
    const foundCertRequest = await CertRequest.find({
      userId: user._id,
    });
    if (!foundCertRequest)
      throw new BadRequestError(
        "Get certificate request failed",
        "Bạn không có yêu cầu chứng chỉ nào"
      );

    // const result = omitFields(foundCertRequest._doc, ["__v", "updatedAt"]);

    return foundCertRequest;
  };

  static checkCertificate = async (certPem) => {
    const foundCA = await CAModel.findOne({ name: "KnB root CA" });
    if (!foundCA)
      throw new InternalServerError(
        "Some thing wrong",
        "Could not find root CA"
      );
    try {
      const CA_Cert = forge.pki.certificateFromPem(foundCA.certificate);
      const checkingCert = forge.pki.certificateFromPem(certPem);
      const result = CA_Cert.verify(checkingCert);
    } catch (e) {
      throw new BadRequestError(
        "Request failed",
        "Chứng chỉ không hợp lệ hoặc hết hạn"
      );
    }

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
    if (!publicKey)
      throw new BadRequestError(
        "Cần cung cấp public key",
        "Cần cung cấp public key"
      );
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
    if (keyUsed)
      throw new BadRequestError(
        "Request certificate failed",
        "Some thing wrong, please try again"
      );
    await PublicKeyUsed.create({ publicHashed: result });

    await CertRequest.create({
      publicKey: publicKey,
      userId: user._id,
    });
    return "Yêu cầu cấp lại chứng chỉ thành công";
  };
}

module.exports = CertificateService;
