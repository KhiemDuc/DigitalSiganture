const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  }
  
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);
  
  module.exports.sendMail = async ({to, OTP}) => {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: to,
        subject: 'OTP',
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome</h2>
          <p style="margin-bottom: 30px;">Dưới đây là mã OTP của bạn</p>
          <p style="margin-bottom: 30px; font-weight: bold">!!!Tuyệt đối không chia sẻ mã này cho bất kỳ ai!!!</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
     </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };