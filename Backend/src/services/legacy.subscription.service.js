const {
  BadRequestError,
  InternalServerError,
} = require("../core/error.response");
const Subscription = require("../models/subscription.model");
const { getSubToken, putSubToken, delSubToken } = require("./cache.service");

const paymentAppLink = process.env.SHORT_LINK;

const PRICE = {
  pro: 150000,
};

const ROW_FIELD = {
  description: "Mô tả",
  invoiceId: "Mã giao dịch",
  value: "Giá trị",
  date: "Ngày diễn ra",
  account: "Số tài khoản",
};

class SubscriptionService {
  static postToken(user, token, plan) {
    if (!token)
      throw new BadRequestError("Post token failed", "Token is not found");
    putSubToken(user._id, token, plan);
    return "Send token success";
  }

  static async getSubState(user) {
    const token = getSubToken(user._id);
    if (!token) throw new BadRequestError("Token is not valid");
    const response = await fetch(paymentAppLink);
    const data = (await response.json()).data;
    const result = data.find((e) => e[ROW_FIELD.description] === token.token);
    let valid = false;
    if (!result) return false;
    if (PRICE[token.plan] <= result[ROW_FIELD.value]) {
      valid = true;
      // add to db
      //...
    }

    return valid;
  }
}

module.exports = SubscriptionService;
