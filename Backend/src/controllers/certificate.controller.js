const CertificateService = require("../services/certificate.service");
const { SuccessResponse } = require("../core/success.response");
const { BadRequestError } = require("../core/error.response");

class CertificateController {
  static async requestCertificate(req, res, next) {
    let files;
    try {
      files = {
        CCCD: req.files.CCCD[0],
        face: req.files.face[0],
        CCCDBack: req.files.CCCDBack[0],
      };
    } catch (err) {
      next(
        new BadRequestError(
          "Bạn nhập thiếu thông tin",
          "Bạn nhập thiếu thông tin"
        )
      );
    }
    new SuccessResponse({
      message: "Request sign certificate success",
      data: await CertificateService.certificateRequest(req.user, req.body, {
        ...files,
      }),
    }).send(res);
  }

  static async getCertRequests(req, res) {
    new SuccessResponse({
      message: "Get certificate requests success",
      data: await CertificateService.getCertRequests(req.query.extend),
    }).send(res);
  }

  static async getMyRequest(req, res) {
    new SuccessResponse({
      message: "Get my certificate requests success",
      data: await CertificateService.getMyCertRequest(req.user),
    }).send(res);
  }
  static async signCertificate(req, res) {
    new SuccessResponse({
      message: await CertificateService.signCertificate(
        req.body.userId,
        req.body.certPem
      ),
    }).send(res);
  }
  static async checkCertificate(req, res) {
    new SuccessResponse({
      message: await CertificateService.checkCertificate(
        req.body.certificatePem
      ),
    }).send(res);
  }

  static async getCertificate(req, res) {
    new SuccessResponse({
      message: "Get certificate requests success",
      data: await CertificateService.getMyCertificate(
        req.headers["x-client-id"]
      ),
    }).send(res);
  }

  static async extendCert(req, res) {
    new SuccessResponse({
      message: await CertificateService.extendCert(
        req.user,
        req.body.publicKey
      ),
    }).send(res);
  }

  static async deleteCert(req, res) {
    new SuccessResponse({
      message: "Delete certificate success",
      data: await CertificateService.deleteCert(req.params.id),
    }).send(res);
  }

  static async getListCert(req, res) {
    new SuccessResponse({
      message: "Get list certificate success",
      data: await CertificateService.getListCert(),
    }).send(res);
  }
}
module.exports = CertificateController;
