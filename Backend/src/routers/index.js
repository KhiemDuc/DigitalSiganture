const express = require('express')
const {SuccessResponse} = require('../core/success.response')
const router = express.Router() 


router.get('/', (req, res) => {
    new SuccessResponse({message: 'Hello'}).send(res)
})



module.exports = router