const SigningHistoryService = require("../services/signingHistory.service");
const { SuccessResponse } = require("../core/success.response");
class SigningHistoryController {
  static async getSigningHistory(req, res) {
    new SuccessResponse({
      data: await SigningHistoryService.getSigningHistory(),
    }).send(res);
  }
}

module.exports = SigningHistoryController;
