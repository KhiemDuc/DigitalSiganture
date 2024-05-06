const { BadRequestError } = require("../core/error.response");
const User = require("../models/user.model");
const UserInfo = require("../models/userInfo.model");
const bcrypt = require("bcrypt");
const { createTokens, createSecretKey } = require("../utils/keyToken");
const pickFields = require("../utils/pickFields");
const omitFields = require("../utils/omitFields");
const checkNotNull = require("../utils/checkNotNull");
const { generateOTP } = require("./otp.service");
const { sendMail } = require("./email.service");
const Certificate = require("../models/certificate.model");
const Subscription = require("../models/subscription.model");
const cacheService = require("./cache.service");
const crypto = require("crypto");

class AccessService {
  static singUp = async ({
    email,
    userName,
    password,
    firstName,
    lastName,
  }) => {
    if (!email || !userName || !password || !firstName || !lastName)
      throw new BadRequestError("Sign up failed", "Missing information");

    const foundUser = await User.findOne({
      userName: userName,
    });
    if (foundUser)
      throw new BadRequestError("Sign up failed", "User name existed");

    const foundInfo = await UserInfo.findOne({
      email: email,
    });
    if (foundInfo)
      throw new BadRequestError("Sign up failed", "Email or password existed");

    const signUpToken = crypto.randomBytes(32).toString("hex");
    const OTPgen = generateOTP();
    sendMail({ to: email, OTP: OTPgen }).catch((err) => console.log(err));
    cacheService.putOTP(
      signUpToken,
      {
        email,
        userName,
        password,
        firstName,
        lastName,
        OTP: OTPgen,
      },
      "verify"
    );
    return { signUpToken: signUpToken };
  };

  static verifySignup = async (token, otp) => {
    const foundOTP = cacheService.getOTP(token, "verify");
    if (!foundOTP || !foundOTP.OTP || foundOTP.OTP !== otp)
      throw new BadRequestError("Verify failed", "OTP is invalid");
    const { email, userName, password, phoneNumber, firstName, lastName } =
      foundOTP;

    const secret = createSecretKey();

    let passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      userName,
      password: passwordHash,
      secretKey: secret.export(),
    });

    const tokens = createTokens({
      payload: {
        _id: newUser._id,
        userName: userName,
        email: email,
      },
      key: secret,
    });
    const userInfo = await UserInfo.create({
      email,
      firstName,
      lastName,
      phoneNumber,
    });
    const cert = await Certificate.create({ userId: newUser._id });
    const subscription = await Subscription.create({ user: newUser });
    newUser.userInfo = userInfo._id;
    newUser.refreshToken = tokens.refreshToken;
    newUser.certificate = cert;
    newUser.subscription = subscription;
    await newUser.save();
    return {
      ...pickFields(newUser, ["_id", "userName", "userInfo.verified"]),
      ...tokens,
    };
  };

  static signIn = async (userName, password) => {
    const foundUser = await User.findOne({ userName }).populate("userInfo");
    if (!foundUser)
      throw new BadRequestError(
        "Sign in failed",
        "User name or password is incorrect"
      );
    const result = bcrypt.compareSync(password, foundUser.password);

    if (!result)
      throw new BadRequestError(
        "Sign in failed",
        "User name or password is incorrect"
      );

    const secret = createSecretKey();

    const tokens = createTokens({
      key: secret,
      payload: {
        _id: foundUser._id,
        userName: foundUser.userName,
        email: foundUser.userInfo.email,
      },
    });

    foundUser.secretKey = secret.export();
    if (foundUser.refreshToken)
      foundUser.refreshTokenUsed.push(foundUser.refreshToken);
    foundUser.refreshToken = tokens.refreshToken;

    await foundUser.save();

    return {
      ...pickFields(foundUser, ["_id", "userName", "foundUser.verified"]),
      ...tokens,
    };
  };

  static signOut = async (foundUser) => {
    const { refreshToken } = foundUser;
    if (refreshToken) foundUser.refreshTokenUsed.push(refreshToken);
    foundUser.refreshToken = null;
    foundUser.secretKey = null;
    await foundUser.save();

    return {
      ...pickFields(foundUser, ["_id", "userName"]),
    };
  };

  static refreshToken = async (foundUser) => {
    const newSecret = createSecretKey();

    const userInfo = UserInfo.findById(foundUser.userInfo);

    const newTokens = createTokens({
      key: newSecret,
      payload: {
        _id: foundUser._id,
        userName: foundUser.userName,
        email: userInfo.email,
      },
    });

    foundUser.secretKey = newSecret.export();
    foundUser.refreshTokenUsed.push(foundUser.refreshToken);
    foundUser.refreshToken = newTokens.refreshToken;

    await foundUser.save();

    return {
      _id: foundUser._id,
      userName: foundUser.userName,
      ...newTokens,
    };
  };

  static getUserInfo = async (user, id) => {
    if (user._id.toString() !== id)
      throw new BadRequestError(
        "Get user information failed",
        "client id is invalid"
      );
    const userInfo = await UserInfo.findById(user.userInfo);
    user.userInfo = userInfo;
    return {
      ...pickFields(user, ["_id", "userName"]),
      ...omitFields(userInfo._doc, ["_id", "__v", "createdAt", "updatedAt"]),
    };
  };

  static changeUserInfo = async (user, payload) => {
    const {
      firstName,
      lastName,
      CCCD,
      address,
      gender,
      dateOfBirth,
      placeOfOrigin,
      nationality,
    } = payload;
    if (
      !checkNotNull(
        firstName,
        lastName,
        address,
        CCCD,
        gender,
        dateOfBirth,
        placeOfOrigin,
        nationality
      )
    ) {
      throw new BadRequestError(
        "Change user info failed",
        "Missing information"
      );
    }
    const foundInfo = await UserInfo.findById(user.userInfo);

    foundInfo.firstName = firstName;
    foundInfo.lastName = lastName;
    foundInfo.CCCD = CCCD;
    foundInfo.address = address;
    foundInfo.gender = gender;
    foundInfo.dateOfBirth = dateOfBirth;
    foundInfo.placeOfOrigin = placeOfOrigin;
    foundInfo.nationality = nationality;
    foundInfo.verified = true;
    try {
      await foundInfo.save();
    } catch (err) {
      throw new BadRequestError(
        "Change user info failed",
        "Some thing wrong, please check inputs again"
      );
    }

    return "Change user info success";
  };

  static saveNewPassword = async (user, newPass) => {
    const newHashedPass = bcrypt.hashSync(newPass, 10);

    user.password = newHashedPass;
    await user.save();

    return "Change password success";
  };

  static findUser = async (search) => {
    let foundUser = await User.findOne({ userName: search }).populate(
      "userInfo"
    );
    let foundInfo = foundUser?.userInfo;
    if (!foundUser) {
      foundInfo = await UserInfo.findOne({ email: search });
      if (!foundInfo)
        throw new BadRequestError("Find user failed", "User is not found");
      foundUser = await User.findOne({ userInfo: foundInfo._id });
    }

    return {
      ...pickFields(foundUser._doc, ["_id", "userName"]),
      firstName: foundInfo.firstName,
      lastName: foundInfo.lastName,
      email: foundInfo.email,
    };
  };

  static resetPassword = async (userId) => {
    const foundUser = await User.findById(userId).populate("userInfo");
    if (!foundUser)
      throw new BadRequestError("Reset password failed", "User id not found");
    const token = crypto.randomBytes(32).toString("hex");
    const resetPassOTP = generateOTP();
    sendMail({ to: foundUser.userInfo.email, OTP: resetPassOTP });
    cacheService.putOTP(
      token,
      { userId, OTP: resetPassOTP, email: foundUser.userInfo.email },
      "reset"
    );

    return { token };
  };

  static confirmResetPasswordOTP = async ({ token, OTP }) => {
    const cache = cacheService.getOTP(token, "reset");
    if (!cache || !cache.OTP || cache.OTP !== OTP)
      throw new BadRequestError("Reset password failed", "OTP is invalid");
    cacheService.delOTP(token);

    const newToken = crypto.randomBytes(32).toString("hex");
    cacheService.putToken(newToken, cache.userId);

    return { token: newToken };
  };
  static acceptNewPassword = async (token, newPassword) => {
    const cachedToken = cacheService.getToken(token);
    console.log(cachedToken);
    if (!cachedToken)
      throw new BadRequestError("Reset password failed", "OTP is incorrect");
    const user = await User.findById(cachedToken);
    return await this.saveNewPassword(user, newPassword);
  };
  static resendOTP = async (token) => {
    const foundOTP =
      cacheService.getOTP(token, "verify") ||
      cacheService.getOTP(token, "reset") ||
      cacheService.getOTP(token, "student");
    if (!foundOTP)
      throw new BadRequestError("Resend OTP failed", "OTP is not found");
    const newOTP = generateOTP();
    sendMail({ to: foundOTP.email, OTP: newOTP }).catch((err) =>
      console.log(err)
    );
    const { type, ...newOTPCache } = foundOTP;
    cacheService.putOTP(token, { ...newOTPCache, OTP: newOTP }, type);

    return "Resend OTP success";
  };
  static async changePassword(user, { password, newPassword }) {
    const result = bcrypt.compareSync(password, user.password);
    if (!result)
      throw new BadRequestError(
        "Change password failed",
        "Password is incorrect"
      );
    return this.saveNewPassword(user, newPassword);
  }

  static async uploadAvt(user, avatar) {
    const fileName = avatar.filename;

    const newInfo = await UserInfo.findByIdAndUpdate(
      user.userInfo,
      { avatar: fileName },
      { new: true }
    );

    return newInfo._doc.avatar;
  }

  static async uploadBackground(user, background) {
    const fileName = background.filename;

    const newInfo = await UserInfo.findByIdAndUpdate(
      user.userInfo,
      { background: fileName },
      { new: true }
    );
    return newInfo._doc.background;
  }

  static async getListUser() {
    const user = await User.find({}).populate("userInfo");
    return user._doc;
  }

  // static async unActivateUser(id) {
  //   const id = await User.findById(id);

  // }
}

module.exports = AccessService;
