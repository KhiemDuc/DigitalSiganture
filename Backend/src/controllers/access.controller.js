const accessService =  require('../services/access.service')
const { CreatedResponse, SuccessResponse } = require('../core/success.response')


class AccessController {
    static async signUp(req, res) {
        new CreatedResponse({
            message: 'Sign up success',
            data: await accessService.singUp(req.body)
        }).send(res)
    }

    static async signIn(req, res) {
        new SuccessResponse({
            message: 'Sign in success',
            data: await accessService.signIn(req.body.userName, req.body.password)
        }).send(res)
    }

    static async logout (req, res) {
        new SuccessResponse({
            message: 'Logout success',
            data: await accessService.signOut(req.user)
        }).send(res)
    }

    static async refreshToken (req, res) {
        new SuccessResponse({
            message: 'Refresh token success',
            data: await accessService.refreshToken(req.user)
        }).send(res)
    }
    
}

module.exports = AccessController