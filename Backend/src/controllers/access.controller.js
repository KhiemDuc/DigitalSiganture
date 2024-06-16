const accessService = require("../services/access.service");
const {
  CreatedResponse,
  SuccessResponse,
} = require("../core/success.response");

class AccessController {
  static async signUp(req, res) {
    new CreatedResponse({
      message: "Sign up success",
      data: await accessService.singUp(req.body),
    }).send(res);
  }
  static async verifySignup(req, res) {
    new SuccessResponse({
      message: "Verify email success",
      data: await accessService.verifySignup(req.headers.token, req.body.otp),
    }).send(res);
  }

  static async signIn(req, res) {
    new SuccessResponse({
      message: "Sign in success",
      data: await accessService.signIn(req.body.userName, req.body.password),
    }).send(res);
  }

  static async logout(req, res) {
    new SuccessResponse({
      message: "Logout success",
      data: await accessService.signOut(req.user),
    }).send(res);
  }

  static async refreshToken(req, res) {
    new SuccessResponse({
      message: "Refresh token success",
      data: await accessService.refreshToken(req.user),
    }).send(res);
  }

  static async getUserInfo(req, res) {
    new SuccessResponse({
      message: "Get user information success",
      data: await accessService.getUserInfo(req.user, req.params.id),
    }).send(res);
  }

  static async findAccount(req, res) {
    new SuccessResponse({
      message: "Find account success",
      data: await accessService.findUser(req.params.search),
    }).send(res);
  }

  static async resetPassword(req, res) {
    new SuccessResponse({
      message: "Request reset password success",
      data: await accessService.resetPassword(req.params.id),
    }).send(res);
  }
  static async confirmOTP(req, res) {
    new SuccessResponse({
      message: "Confirm OTP success",
      data: await accessService.confirmResetPasswordOTP({
        token: req.headers.token,
        OTP: req.body.otp,
      }),
    }).send(res);
  }
  static async newPassword(req, res) {
    new SuccessResponse({
      message: await accessService.acceptNewPassword(
        req.headers.token,
        req.body.newPassword
      ),
    }).send(res);
  }

  static async resendOTP(req, res) {
    new SuccessResponse({
      message: await accessService.resendOTP(req.headers.token),
    }).send(res);
  }

  static async changePassword(req, res) {
    new SuccessResponse({
      message: await accessService.changePassword(req.user, req.body),
    }).send(res);
  }

  static async changeAvatar(req, res) {
    new SuccessResponse({
      message: "Change avatar success",
      data: await accessService.uploadAvt(req.user, req.file),
    }).send(res);
  }

  static async changeBackground(req, res) {
    new SuccessResponse({
      message: "Change background image success",
      data: await accessService.uploadBackground(req.user, req.file),
    }).send(res);
  }

  static async getListUser(req, res) {
    new SuccessResponse({
      data: await accessService.getListUser(),
    }).send(res);
  }

  static async toggleLock(req, res) {
    new SuccessResponse({
      message: await accessService.toggleLockUser(req.params.id),
    }).send(res);
  }
}

module.exports = AccessController;
