const { putOTP, getOTP, delOTP } = require("./cache.service");
const { sendMail } = require("./email.service");
const { generateOTP } = require("./otp.service");
const getRandomToken = require("../utils/getRandomToken");
const { ForbiddenError, BadRequestError } = require("../core/error.response");
const Subscription = require("../models/subscription.model");
const plansModel = require("../models/plans.model");
const Student = require("../models/student.model");
const { createPayment } = require("./payment.service");
const pickFields = require("../utils/pickFields");
const constants = {
  student: "student",
  eduEmailExtension: "@thanglong.edu.vn",
};
class SubscriptionService {
  static async getCurrentSubscription(user) {
    let foundSubscription = await Subscription.findById(
      user.subscription
    ).populate("plan");
    // hết hạn: Chuyển về gói mặc định
    if (!foundSubscription.plan.isDefault) {
      if (foundSubscription.end < Date.now()) {
        await this.unsubscribePlan({ user: user });
        foundSubscription = await Subscription.findById(user.subscription);
      }
    }
    return { ...pickFields(foundSubscription._doc, "plan", "start", "end") };
  }

  static async studentSub({ user, studentInfo }) {
    if (!studentInfo.studentId)
      throw new BadRequestError("", "Mã sinh viên không hợp lệ");
    const studentPlan = await plansModel.findOne({ name: constants.student });

    const foundSubscription = await Subscription.findById(user.subscription);
    if (foundSubscription.plan.toString() === studentPlan._id.toString())
      throw new BadRequestError(
        "Không thể đăng ký",
        "Bạn đã đăng ký gói này rồi"
      );
    // check student info
    const fullName =
      `${studentInfo.lastName} ${studentInfo.firstName}`.toLocaleLowerCase();
    const foundStudent = await Student.findOne({
      studentId: studentInfo.studentId.toUpperCase(),
    });
    if (!foundStudent)
      throw new BadRequestError(
        "Đăng ký gói sinh viên không thành công",
        "Thông tin sinh viên không chính xác"
      );
    if (fullName !== foundStudent.fullName)
      throw new BadRequestError(
        "Đăng ký gói thất bại",
        "Thông tin sinh viên không hợp lệ"
      );
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
    putOTP(
      token,
      { userId: user._id.toString(), OTP: OTP, email: eduMail },
      constants.student
    );
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
    delOTP(token);
    // add student subscription to db
    const foundSubscription = await Subscription.findById(user.subscription);
    const foundPlan = await plansModel.findOne({ name: "student" });

    const subscriptionHistory = {};
    subscriptionHistory.plan = foundSubscription.plan;
    subscriptionHistory.start = foundSubscription.start;
    subscriptionHistory.end = foundSubscription.end;
    foundSubscription.history.push(subscriptionHistory);
    let end = new Date(Date.now());
    end.setFullYear(end.getFullYear() + 4);
    foundSubscription.plan = foundPlan._id;
    foundSubscription.start = Date.now();
    foundSubscription.end = end;
    await foundSubscription.save();
    return "Verify student success";
  }
  //priority: student > pro > standard
  static async subscribePlan({ planId, user }) {
    const foundPlan = await plansModel.findById(planId);
    if (!foundPlan)
      throw new BadRequestError("Subscribe plan failed", "Plan is invalid");
    const userSubscription = await Subscription.findById(
      user.subscription
    ).populate("plan");
    if (userSubscription.plan.toString() === foundPlan._id.toString()) {
      throw new BadRequestError(
        "Can not subscribe plan",
        "You are already subscribe it"
      );
    }
    if (userSubscription.plan.tier >= foundPlan.tier) {
      throw new BadRequestError(
        "Subscribe plan failed",
        "You subscribed to better plan"
      );
    }
    return createPayment({ user, planId });
  }

  static async unsubscribePlan({ user }) {
    const foundSubscription = await Subscription.findById(
      user.subscription
    ).populate("plan");
    if (foundSubscription.plan.name === "standard")
      throw new BadRequestError(
        "Unsubscribe plan failed",
        "You can not unsubscribe standard plan"
      );
    const defaultPlan = await plansModel.findOne({ isDefault: true });
    const history = {
      plan: foundSubscription.plan,
      start: foundSubscription.start,
      end: foundSubscription.end,
    };
    foundSubscription.plan = defaultPlan._id;
    foundSubscription.start = Date.now();
    foundSubscription.end = null;
    foundSubscription.history.push(history);
    await foundSubscription.save();
    return "Unsubscribe plan success";
  }
}

module.exports = SubscriptionService;
