const accessService =  require('../services/access.service')
const { CreatedResponse } = require('../core/success.response')


class AccessController {
    static async signUp(req, res) {
        new CreatedResponse({
            message: 'Sign up success',
            data: await accessService.singUp(req.body)
        }).send(res)
    }
}

module.exports = AccessController