const express = require('express')
const asyncHandler = require('../utils/asyncHandler')
const authentication = require('../middlewares/authentication')
const CertificateController = require('../controllers/certificate.controller')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: 'upload/',
    filename: (req, file, cb) => {
        const arr = file.originalname.split('.')
        const suffix = '.' + arr[arr.length - 1]
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + suffix
        cb(null, name)
    }
})
const upload = multer({
    storage, fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true)
        else cb(new Error('Only images is allowed'), false)
    }
})


router.use('/', authentication)
router.post('/', upload.fields([{name: 'CCCD', maxCount: 1}, {name: 'face', maxCount: 1}]) ,asyncHandler(CertificateController.requestCertificate))

// router.use('/ca')
router.get('/ca', asyncHandler(CertificateController.getCertRequests))
router.post('/ca', asyncHandler(CertificateController.signCertificate))

module.exports = {upload, router}