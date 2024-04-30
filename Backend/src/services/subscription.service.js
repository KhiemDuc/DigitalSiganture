const { putOTP, getOTP } = require("./cache.service");
const { sendMail } = require("./email.service");
const { generateOTP } = require("./otp.service");
const getRandomToken = require("../utils/getRandomToken");
const { ForbiddenError, BadRequestError } = require("../core/error.response");
const Subscription = require("../models/subscription.model");
const plansModel = require("../models/plans.model");
const PayOS = require("@payos/node");

const payOS = new PayOS(
  "26e4e1a6-19d9-45cf-829a-a835cfd8e129",
  "3680cfc7-2ca6-45e7-a32f-ce91d914eb5b",
  "371d27e82ad3a0a9b67064891973bb53ff23f67bf65cc5486f3e79d15c7bf9ca"
);

const constants = {
  student: "student",
  eduEmailExtension: "@thanglong.edu.vn",
};
class SubscriptionService {
  static async studentSub({ user, studentInfo }) {
    const studentPlan = await plansModel.findOne({ name: constants.student });
    const foundSubscription = await Subscription.findById(user.subscription);
    if (foundSubscription.plan.toString() === studentPlan._id.toString())
      throw new BadRequestError(
        "Can not subscribe student plan",
        "You are already subscribe it"
      );
    // check student info

    // end check

    //send mail to student
    const eduMail = studentInfo.studentId + constants.eduEmailExtension;
    const OTP = generateOTP();
    sendMail({
      to: eduMail,
      OTP: OTP,
      edu: true,
    });

    const token = getRandomToken();
    // store OTP to cache
    putOTP(token, { userId: user._id.toString(), OTP: OTP }, constants.student);
    //return
    return { token };
  }

  static async studentVerify({ user, OTP, token }) {
    const storedOTP = getOTP(token, constants.student);
    if (!storedOTP)
      throw new BadRequestError("Verify student failed", "Token is invalid");
    if (user._id.toString() !== storedOTP.userId)
      throw new ForbiddenError("Verify student failed", "Access denied");
    if (OTP !== storedOTP.OTP)
      throw new BadRequestError("Verify student failed", "OTP is invalid");

    // add student subscription to db
    const foundSubscription = await Subscription.findById(user.subscription);
    const foundPlan = await plansModel.findOne({ name: "student" });

    const subscriptionHistory = {};
    subscriptionHistory.plan = foundSubscription.plan;
    subscriptionHistory.start = foundSubscription.start;
    subscriptionHistory.end = foundSubscription.end;
    foundSubscription.history.push(subscriptionHistory);

    foundSubscription.plan = foundPlan._id;
    foundSubscription.start = Date.now();

    await foundSubscription.save();
    return "Verify student success";
  }
  //priority: student > pro > standard
  static async subscribePlan({ planId, user }) {
    const foundPlan = await plansModel.findById(planId);
    if (!foundPlan)
      throw new BadRequestError("Subscribe plan failed", "Plan is invalid");
  }
}

module.exports = SubscriptionService;
