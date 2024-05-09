const {
  BadRequestError,
  InternalServerError,
} = require("../core/error.response");
const Certificate = require("../models/certificate.model");
const CertRequest = require("../models/certRequest.model");
const { changeUserInfo } = require("./access.service");
const PublicKeyUsed = require("../models/publicKeyUsed.model");
const crypto = require("crypto");
const pickFields = require("../utils/pickFields");
const axios = require("axios");
const fs = require("fs");
const CAModel = require("../models/CA.model");
const forge = require("node-forge");
const constants = {
  idApi: "https://api.fpt.ai/vision/idr/vnm",
  faceApi: "https://api.fpt.ai/dmp/checkface/v1/",
  apiKey: "api-key",
  apiKeyValue: "UCX1X6G3x9blzxGazvo1wdGJhgAe8Nco",
  image: "image",
};
class CertificateService {
  static certificateRequest = async (user, info, { CCCD, face, CCCDBack }) => {
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
    const fullName = `${info.firstName} ${info.lastName}`.toUpperCase();
    if (fullName !== received.name)
      throw new BadRequestError(
        `Can't request certificate`,
        "ID is invalid name"
      );

    //check date of birth, nationality, home(placeOfOrigin), address
    //end
    // await changeUserInfo(user, { ...info });
    const hash = crypto.createHash("sha256");
    hash.update(info.publicKey);
    const result = hash.digest("hex");
    const keyUsed = await PublicKeyUsed.findOne({ publicHashed: result });
    if (keyUsed)
      throw new BadRequestError(
        "Request certificate failed",
        "Some thing wrong, please try again"
      );

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
    });
    await PublicKeyUsed.create({ publicHashed: result });

    return pickFields(newReq._doc, ["publicKey", "firstName", "lastName"]);
  };

  static getCertRequests = async () => {
    return await CertRequest.find({});
  };

  static signCertificate = async (userId, certPem) => {
    const foundCert = await Certificate.findOne({ userId });
    foundCert.certPem = certPem;
    await foundCert.save();
    return "Sign certificate success";
  };

  static getMyCertRequest = async (user) => {
    const foundCertRequest = await CertRequest.findOne({
      userId: user._id,
    }).populate({ path: "userId", populate: { path: "userInfo" } });
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
}

module.exports = CertificateService;
