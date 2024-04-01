const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/user.model')
const { BadRequestError, ForbiddenError } = require('../core/error.response')
const crypto = require('crypto')
const { verifyToken } = require('../utils/keyToken')
const HEADERS = {
    Authentication: 'authentication',
    Client_id: 'x-client-id'
}


module.exports = asyncHandler(async (req, res, next) => {
    const clientId = req.headers[HEADERS.Client_id]
    const accessToken = req.headers[HEADERS.Authentication]

    const foundUser = await User.findById(clientId)
    if (!foundUser) throw new BadRequestError('Request failed', 'Client id is invalid')

    let decoded, secret
    try {

        secret = crypto.createSecretKey(foundUser.secretKey)
        decoded = verifyToken(accessToken, secret)
    } catch (err) {
        if (err.message === 'jwt expired') {
            throw new BadRequestError('Request failed', 'Token expired')
        }
        throw new ForbiddenError('Request failed', 'Token is invalid')
    }
    
    if (decoded._id !== foundUser._id.toString()) throw new ForbiddenError('Request failed', 'Access denied')
    

    req.user = foundUser
    req.secretKey = secret

    return next()
})