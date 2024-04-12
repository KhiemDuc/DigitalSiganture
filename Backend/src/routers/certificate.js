const express = require('express')
const asyncHandler = require('../utils/asyncHandler')
const authentication = require('../middlewares/authentication')
const CertificateController = require('../controllers/certificate.controller')

const router = express.Router()

router.use('/', authentication)
router.post('/', asyncHandler(CertificateController.requestCertificate))

// router.use('/ca')
router.get('/ca', asyncHandler(CertificateController.getCertirequests))
router.post('/ca', asyncHandler(CertificateController.signCertificate))

module.exports = router