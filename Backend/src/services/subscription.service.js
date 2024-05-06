const { putOTP, getOTP } = require("./cache.service");
const { sendMail } = require("./email.service");
const { generateOTP } = require("./otp.service");
const getRandomToken = require("../utils/getRandomToken");
const { ForbiddenError, BadRequestError } = require("../core/error.response");
const Subscription = require("../models/subscription.model");
const plansModel = require("../models/plans.model");
const { createPayment } = require("./payment.service");
const pickFields = require("../utils/pickFields");
const constants = {
  student: "student",
  eduEmailExtension: "@thanglong.edu.vn",
};
class SubscriptionService {
  static async getCurrentSubscription(user) {
    const foundSubscription = await Subscription.findById(
      user.subscription
    ).populate("plan");
    return { ...pickFields(foundSubscription._doc, "plan", "start", "end") };
  }

  static async studentSub({ user, studentInfo }) {
    if (!studentInfo.studentId)
      throw new BadRequestError("", "StudentId is not found");
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
    const userSubscription = await Subscription.findById(user.subscription);
    if (userSubscription.plan.toString() === foundPlan._id.toString()) {
      throw new BadRequestError(
        "Can not subscribe plan",
        "You are already subscribe it"
      );
    }
    if (userSubscription.tier >= foundPlan.tier) {
      throw new BadRequestError(
        "Subscribe plan failed",
        "You subscribed to better plan"
      );
    }
    return createPayment({ user, planId });
  }
}

module.exports = SubscriptionService;
