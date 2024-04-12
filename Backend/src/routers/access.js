const express = require('express')
const AccessController = require('../controllers/access.controller')
const asyncHandler = require('../utils/asyncHandler')
const authentication = require('../middlewares/authentication')
const refreshTokenAuth = require('../middlewares/refreshTokenAuth')

const router = express.Router()

router.post('/signup', asyncHandler(AccessController.signUp))
router.post('/signup/verify', asyncHandler(AccessController.verifySignup))
// router.get('/se/:id', asyncHandler(AccessController.getKey))
router.post('/signin', asyncHandler(AccessController.signIn))

router.use('/refresh-token', refreshTokenAuth)
router.get('/refresh-token', asyncHandler(AccessController.refreshToken))

router.use(authentication)
router.get('/otp', asyncHandler(AccessController.getOTP))
router.post('/otp', asyncHandler(AccessController.verifyOTP))
router.get('/:id', asyncHandler(AccessController.getUserInfo))
router.post('/logout', asyncHandler(AccessController.logout))
// router.put('/:id', asyncHandler(AccessController.))


module.exports = router