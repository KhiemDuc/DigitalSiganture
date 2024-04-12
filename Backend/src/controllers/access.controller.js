const accessService =  require('../services/access.service')
const { CreatedResponse, SuccessResponse } = require('../core/success.response')


class AccessController {
    static async signUp(req, res) {
        new CreatedResponse({
            message: 'Sign up success',
            data: await accessService.singUp(req.body)
        }).send(res)
    }
    static async verifySignup(req, res) {
        new SuccessResponse({
            message: 'Verify email success',
            data: await accessService.verifySignup(req.headers.token, req.body.otp)
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

    static async getUserInfo (req, res) {
        new SuccessResponse({
            message: 'Get user information success',
            data: await accessService.getUserInfo(req.user, req.params.id)
        }).send(res)
    }

    static async getOTP(req, res) {
        new SuccessResponse({
            message: await accessService.createOTP(req.user)
        }).send(res)
    }

    static async verifyOTP(req, res) {
        new SuccessResponse({
            message: await accessService.verifyOTP(req.user, req.body.otp)
        }).send(res)
    }
    
}

module.exports = AccessController