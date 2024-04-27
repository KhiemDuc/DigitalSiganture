const { BadRequestError } = require('../core/error.response')
const Certificate = require('../models/certificate.model')
const CertRequest = require('../models/certRequest.model')
const { changeUserInfo } = require ('./access.service')
const PublicKeyUsed = require('../models/publicKeyUsed.model')
const crypto = require('crypto')
const pickFields = require('../utils/pickFields')
const axios = require('axios')
const constants = {
    idApi: 'https://api.fpt.ai/vision/idr/vnm',
    faceApi: 'https://api.fpt.ai/dmp/checkface/v1/',
    apiKey: 'api-key',
    apiKeyValue: 'UCX1X6G3x9blzxGazvo1wdGJhgAe8Nco',
    image: 'image',


}
class CertificateService {
    static certificateRequest = async (user, info, {CCCD, face}) => {
        //face check 

        // let faceData = {}
        // const formData = new FormData()
        // formData.append('file[]', CCCD.buffer.toString('base64'))
        // formData.append('file[]', face.buffer.toString('base64'))
        // console.log(formData);
        // try {
        //     faceData = await axios.post(constants.faceApi, formData,{
        //         headers: {
        //             [constants.apiKey]: constants.apiKeyValue,
        //             'Content-Type': 'multipart/form-data'

        //         },
    
        //     })
        // } catch (err) {
        //     throw new BadRequestError(`Can't request certificate`, 'Face image or id card image is invalid')
        // }
        // console.log(faceData.data);
        // if (!faceData.data.data.isMatch || faceData.data.data.isBothImgIDCard) throw new BadRequestError(`Can't request certificate`, 'Face image is invalid')
        // console.log(CCCD, face);
        // Id check;
        let idData = {}
        let idFormData = new FormData();
        idFormData.append('image_base64', CCCD.buffer.toString('base64'));
        console.log(idFormData);
        try {
            idData = await axios.post(constants.idApi, idFormData,{
                headers: {
                    [constants.apiKey]: constants.apiKeyValue
                },
            })

        } catch (err) {
            console.log(err.response.data);
            throw new BadRequestError(`Can't request certificate`, 'Id card id invalid')
        }

        const received = idData.data.data[0]
        if (info.CCCD !== received.id) throw new BadRequestError(`Can't request certificate`, 'ID is invalid')
        const fullName = `${info.firstName} ${info.lastName}`.toUpperCase()
        if (fullName !== received.name) throw new BadRequestError(`Can't request certificate`, 'ID is invalid name')

        //check date of birth, nationality, home(placeOfOrigin), address
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