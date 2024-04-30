const OTP = require("../models/otp.model");
class Block {
  constructor() {
    this.OTPIds = {};
  }

  set(OTPId) {
    if (this.OTPIds[OTPId]) return;
    this.OTPIds[OTPId] = OTPId;
    setTimeout(async () => {
      const foundOTP = await OTP.findById(OTPId);
      foundOTP.attempts = 0;
      foundOTP.value = null;
      foundOTP.type = null;
      foundOTP.exp = null;
      await foundOTP.save();
      this.OTPIds[OTPId] = undefined;
    }, 30000);
  }
}

module.exports = new Block();
