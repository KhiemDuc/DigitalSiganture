const express = require('express')
const {SuccessResponse} = require('../core/success.response')
const router = express.Router() 



router.get('/', (req, res) => {
    new SuccessResponse({message: 'Hello'}).send(res)
})
router.use('/access', require('./access'))


module.exports = router