const nodemailer = require("nodemailer");

const MAIL_SETTINGS = {
  gmail: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  eduMail: {
    service: "hotmail",
    auth: {
      user: process.env.EDU_MAILER,
      pass: process.env.EDU_PASS,
    },
  },
};

const gmailTransporter = nodemailer.createTransport(MAIL_SETTINGS.gmail);
let eduTransporter = nodemailer.createTransport(MAIL_SETTINGS.eduMail);

module.exports.sendMail = async ({
  to,
  OTP,
  edu = false,
  certificate = false,
}) => {
  const transporter = edu ? eduTransporter : gmailTransporter;

  const from = edu
    ? MAIL_SETTINGS.eduMail.auth.user
    : MAIL_SETTINGS.gmail.auth.user;
  const mailConfig = {
    from,
    to,
  };
  const html = `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>${edu ? "Xác nhận tư cách sinh viên" : "Welcome"}</h2>
      <p style="margin-bottom: 30px;">Dưới đây là mã OTP của bạn</p>
      <p style="margin-bottom: 30px; font-weight: bold">!!!Tuyệt đối không chia sẻ mã này cho bất kỳ ai!!!</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
  </div>
  `;
  mailConfig.subject = certificate ? "Cập nhật yêu cầu chứng chỉ số" : "OTP";
  mailConfig.html = certificate
    ? "Đã xử lý yêu cầu cấp mới/cấp đổi chứng chỉ, vui lòng đăng nhập hệ thống để xem"
    : html;
  let info = await transporter.sendMail(mailConfig);
  return info;
};
