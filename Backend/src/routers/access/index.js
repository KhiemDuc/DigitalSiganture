const express = require('express')
const AccessController = require('../../controllers/access.controller')
const asyncHandler = require('../../utils/asyncHandler')
const authentication = require('../../middlewares/authentication')
const refreshTokenAuth = require('../../middlewares/refreshTokenAuth')

const router = express.Router()

router.post('/signup', asyncHandler(AccessController.signUp))
// router.get('/se/:id', asyncHandler(AccessController.getKey))
router.post('/signin', asyncHandler(AccessController.signIn))

router.use('/refresh-token', refreshTokenAuth)
router.get('/refresh-token', asyncHandler(AccessController.refreshToken))

router.use(authentication)
router.post('/logout', asyncHandler(AccessController.logout))




module.exports = router