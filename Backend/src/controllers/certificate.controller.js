const CertificateService = require("../services/certificate.service");
const { SuccessResponse } = require("../core/success.response");

class CertificateController {
  static async requestCertificate(req, res) {
    new SuccessResponse({
      message: "Request sign certificate success",
      data: await CertificateService.certificateRequest(req.user, req.body, {
        CCCD: req.files.CCCD[0],
        face: req.files.face[0],
        CCCDBack: req.files.CCCDBack[0],
      }),
    }).send(res);
  }

  static async getCertRequests(req, res) {
    new SuccessResponse({
      message: "Get certificate requests success",
      data: await CertificateService.getCertRequests(),
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
}
module.exports = CertificateController;
