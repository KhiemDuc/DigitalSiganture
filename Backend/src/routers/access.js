const express = require('express')
const AccessController = require('../controllers/access.controller')
const asyncHandler = require('../utils/asyncHandler')
const authentication = require('../middlewares/authentication')
const refreshTokenAuth = require('../middlewares/refreshTokenAuth')

const router = express.Router()

//routers for sign up
router.post('/signup', asyncHandler(AccessController.signUp))
router.post('/signup/verify', asyncHandler(AccessController.verifySignup))
// router.get('/se/:id', asyncHandler(AccessController.getKey))
router.post('/signin', asyncHandler(AccessController.signIn))

//routers for reset password
router.get('/find/:search', asyncHandler(AccessController.findAccount))
router.get('/reset/:id', asyncHandler(AccessController.resetPassword))
router.post('/confirm', asyncHandler(AccessController.confirmOTP))
router.post('/new-pass', asyncHandler(AccessController.newPassword))

// resend OTP, require 'token' field in headers
router.get('/resend-otp', asyncHandler(AccessController.resendOTP))

//refresh token
router.use('/refresh-token', refreshTokenAuth)
router.get('/refresh-token', asyncHandler(AccessController.refreshToken))


router.use(authentication)
router.get('/:id', asyncHandler(AccessController.getUserInfo))
router.post('/logout', asyncHandler(AccessController.logout))
// router.put('/:id', asyncHandler(AccessController.))


module.exports = router