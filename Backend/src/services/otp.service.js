const otpGenerator = require('otp-generator')

const OTP_CONFIG = {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
}

const OTP_LENGTH = 6

module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG)
    return OTP
}

