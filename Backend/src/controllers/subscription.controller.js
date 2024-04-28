const { SuccessResponse } = require('../core/success.response')
const SubscriptionService = require('../services/legacy.subscription.service')

class Subscription {
    static async postToken(req, res) {
        new SuccessResponse({
            message: SubscriptionService.postToken(req.user, req.body.token, req.body.plan),
        }).send(res)
    }
    static async getInfo(req, res) {
        new SuccessResponse({
            message: 'Get info success',
            data: await SubscriptionService.getSubState(req.user)
        }).send(res)
    }
}


module.exports = Subscription