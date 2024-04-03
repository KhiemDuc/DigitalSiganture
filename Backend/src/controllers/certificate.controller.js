const CertificateService =require('../services/certificate.service')
const {SuccessResponse} = require('../core/success.response')

class CertificateController {
    static async requestCertificate(req, res) {
        new SuccessResponse({
            message: 'Request sign certificate success',
            data: await CertificateService.certificateRequest(req.user, req.body)
        }).send(res)
    }

    static async getCertirequests(req, res) {
        new SuccessResponse({
            message: 'Get certificate requests success',
            data: await CertificateService.getCertiRequests()
        }).send(res)
    }

    static async signCertificate(req, res) {
        new SuccessResponse({
            message: await CertificateService.signCertificate(req.body.userId, req.body.certPem)
        }).send(res)
    }
}
module.exports = CertificateController