const express = require("express");
const payOS = require("../services/payos.service");
const orderModel = require("../models/order.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const data = payOS.verifyPaymentWebhookData(req.body);
  console.log(data);
  //save to database
  // const foundOrder = await orderModel.findOne({
  //   "data.orderCode": data.orderCode,
  // });

  // foundOrder.data.status = "SUCCESS";

  // await foundOrder.save();
  return res.json({ success: true });
});

module.exports = router;
