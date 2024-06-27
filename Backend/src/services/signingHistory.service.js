const SigningHistory = require("../models/signingHistory.model");

class SigningHistoryService {
  static async getSigningHistory() {
    const foundHistory = await SigningHistory.find().populate({
      path: "user",
      populate: {
        path: "userInfo",
        model: "UserInfo",
      },
    });

    return foundHistory;
  }
}

module.exports = SigningHistoryService;
