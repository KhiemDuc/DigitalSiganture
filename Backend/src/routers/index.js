const express = require('express')
const {SuccessResponse} = require('../core/success.response')
const router = express.Router() 


router.use('/access', require('./access'))
router.use('/certificate', require('./certificate').router)
router.use('/subscription', require('./subscription'))
module.exports = router