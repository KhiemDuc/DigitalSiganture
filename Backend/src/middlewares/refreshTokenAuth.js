const { BadRequestError, ForbiddenError } = require("../core/error.response");
const User = require('../models/user.model')
const asyncHandler = require("../utils/asyncHandler");
const crypto = require('crypto');
const { verifyToken } = require("../utils/keyToken");

const HEADERS = {
    ClientId : 'x-client-id',
    RefreshToken: 'refresh-token'
}

module.exports = asyncHandler(async (req, res, next) => {
    const clientId = req.headers[HEADERS.ClientId]
    const refreshToken = req.headers[HEADERS.RefreshToken]

    if (!clientId || !refreshToken) throw new BadRequestError('Request failed', 'Missing information')

    const foundUser = await User.findById(clientId)
    if (!foundUser) throw new BadRequestError('Request failed', 'Client id is invalid')

    console.log(foundUser._doc)
    let decoded, secret
    try {
        secret = crypto.createSecretKey(foundUser.secretKey)

        decoded = verifyToken(refreshToken, secret)
    } catch(err) {
        if (foundUser.refreshTokenUsed.some(item => item === refreshToken)) {
            foundUser.secretKey = null
            foundUser.refreshToken = null
            foundUser.refreshTokenUsed = []
            await foundUser.save()
            throw new ForbiddenError('Request failed', 'Some thing wrong, please login again')
        }
        
        throw new ForbiddenError('Request failed', 'Access denied - 1')
    }
    if (decoded._id !== foundUser._id.toString()) throw new ForbiddenError('Request failed', 'Access denied')
 
    req.user = foundUser
    req.secretKey = secret
    return next()

})