const { SuccessResponse } = require("../core/success.response");
const SubscriptionService = require("../services/subscription.service");
class Subscription {
  static async postToken(req, res) {
    new SuccessResponse({
      message: _SubscriptionService.postToken(
        req.user,
        req.body.token,
        req.body.plan
      ),
    }).send(res);
  }
  static async getInfo(req, res) {
    new SuccessResponse({
      message: "Get info success",
      data: await _SubscriptionService.getSubState(req.user),
    }).send(res);
  }
  static async studentSub(req, res) {
    new SuccessResponse({
      message: "Subscribe student plan success",
      data: await SubscriptionService.studentSub({
        user: req.user,
        studentInfo: req.body,
      }),
    }).send(res);
  }

  static async verifyStudent(req, res) {
    new SuccessResponse({
      message: await SubscriptionService.studentVerify({
        user: req.user,
        OTP: req.body.OTP,
        token: req.headers.token,
      }),
    }).send(res);
  }

  static async subscribePlan(req, res) {
    new SuccessResponse({
      message: "Subscribe plan success",
      data: await SubscriptionService.subscribePlan({
        user: req.user,
        planId: req.body.planId,
      }),
    }).send(res);
  }
  static async getSubscription(req, res) {
    new SuccessResponse({
      message: "Get subscription success",
      data: await SubscriptionService.getCurrentSubscription(req.user),
    }).send(res);
  }
}

module.exports = Subscription;
