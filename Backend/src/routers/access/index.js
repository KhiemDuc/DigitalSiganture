const express = require('express')
const router = express.Router()
const accessService =  require('../../services/access.service')
const {CreatedResponse, SuccessResponse} = require('../../core/success.response')



module.exports = router