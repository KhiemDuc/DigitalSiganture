const OTP = require("../models/otp.model");

class Block {
  constructor() {
    this.OPTs = {};
  }

  set(OTPId) {
    if (this.OPTs[OTPId]) return;
    this.OPTs[OTPId] = OTPId;
    setTimeout(async () => {
      const foundOTP = await OTP.findById(OTPId);
      foundOTP.value = null;
      foundOTP.retry = 0;
      foundOTP.exp = null;
      foundOTP.type = null;
      await foundOTP.save();
      this.OPTs[OTPId] = undefined;
    }, 30000);
  }
}

module.exports = new Block();
