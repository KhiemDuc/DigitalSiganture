const express = require('express')
const {SuccessResponse} = require('../core/success.response')
const router = express.Router() 


router.use('/access', require('./access'))


module.exports = router