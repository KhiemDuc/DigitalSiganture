const express = require('express')
const AccessController = require('../../controllers/access.controller')
const asyncHandler = require('../../core/asyncHandler')
const router = express.Router()

router.post('/signup', asyncHandler(AccessController.signUp))


module.exports = router