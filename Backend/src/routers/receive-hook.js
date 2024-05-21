const express = require("express");
const payOS = require("../services/payos.service");
const orderModel = require("../models/order.model");
const asyncHandler = require("../utils/asyncHandler");
const subscriptionModel = require("../models/subscription.model");
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = payOS.verifyPaymentWebhookData(req.body);
    //save to database
    const foundOrder = await orderModel.findOne({
      "data.orderCode": data.orderCode,
    });
    foundOrder.data.status = "PAID";
    foundOrder.save();

    const foundSubscription = await subscriptionModel.findOne({
      user: foundOrder.user,
    });
    foundSubscription.plan = foundOrder.plan;
    foundSubscription.start = Date.now();
    foundSubscription.end = null;
    foundSubscription.save();
    // await foundOrder.save();
    return res.json({ success: true });
  })
);

module.exports = router;
