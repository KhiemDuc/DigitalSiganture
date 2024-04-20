const { BadRequestError } = require('../core/error.response')
const Certificate = require('../models/certificate.model')
const CertRequest = require('../models/certRequest.model')
const { changeUserInfo } = require ('./access.service')
const PublicKeyUsed = require('../models/publicKeyUsed.model')
const crypto = require('crypto')
const pickFields = require('../utils/pickFields')
class CertificateService {
    static certificateRequest = async (user, info, {CCCD, face}) => {
        // check face and CCCD
        
        //end
        await changeUserInfo(user, {...info})        
        // avatar: avatar[0].filename, background: background[0].filename
        const hash = crypto.createHash('sha256')
        hash.update(info.publicKey)
        const result = hash.digest('hex')
        const keyUsed = await PublicKeyUsed.findOne({publicHashed: result})
        if (keyUsed) throw new BadRequestError('Request certificate failed', 'Some thing wrong, please try again')
        
        const newReq = await CertRequest.create({firstName: info.firstName, lastName: info.lastName, publicKey: info.publicKey, userId: user._id})
        await PublicKeyUsed.create({publicHashed: result})

        return pickFields(newReq._doc, ['publicKey', 'firstName', 'lastName'])

    }
    static getCertRequests = async () => {
        return await CertRequest.find({})
    }
    
    static signCertificate = async (userId, certPem) => {
        const foundCert = await Certificate.findOne({userId})
        foundCert.certPem = certPem
        await foundCert.save()
        return 'Sign certificate success'
    }
}

module.exports = CertificateService