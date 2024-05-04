const plansModel = require("../models/plans.model");
const { InternalServerError } = require("../core/error.response");
const orderModel = require("../models/order.model");
const payOS = require("./payos.service");

const FRONTEND_HOST = process.env.FRONTEND_HOST;
class PaymentService {
  static async createPayment({ user, planId }) {
    const plan = await plansModel.findById(planId);
    if (!plan)
      throw new InternalServerError("Request failed", `Could not find plan`);
    const order = await orderModel.create({
      user: user._id,
      plan: plan._id,
      data: {
        amount: plan.price,
      },
    });
    const returnUrl = `${FRONTEND_HOST}/success`;
    const cancelUrl = `${FRONTEND_HOST}/cancel`;
    const expiredAt = Math.floor(Date.now() / 1000) + 60 * 30;
    const paymentData = {
      orderCode: order.data.orderCode,
      amount: plan.price,
      description: `Payment for ${plan.name} plan`,
      returnUrl: returnUrl,
      cancelUrl: cancelUrl,
      expiredAt: expiredAt,
    };
    const paymentResponse = await payOS.createPaymentLink(paymentData);
    order.data = paymentResponse;
    await order.save();
    return { link: paymentResponse.checkoutUrl, returnUrl, cancelUrl };
  }
}

module.exports = PaymentService;
