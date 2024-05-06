const express = require("express");
const payOS = require("../services/payos.service");
const orderModel = require("../models/order.model");
const asyncHandler = require("../utils/asyncHandler");
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
    // await foundOrder.save();
    return res.json({ success: true });
  })
);

module.exports = router;
