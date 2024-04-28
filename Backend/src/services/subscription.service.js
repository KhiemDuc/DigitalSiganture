const { putOTP, getOTP } = require('./cache.service')
const { sendMail } = require('./email.service')
const { generateOTP } = require('./otp.service')
const getRandomToken = require('../utils/getRandomToken')
const { ForbiddenError, BadRequestError } = require('../core/error.response')

const constants = {
    student: 'student',
    eduEmailExtension: '@thanglong.edu.vn'
}
class SubscriptionService {
    static async studentSub({ user, studentInfo }) {   
        // check student info 

        // end check 

        //send mail to student
        const eduMail = studentInfo.studentId + constants.eduEmailExtension
        const OTP = generateOTP()
        sendMail({
            to: eduMail,
            OTP: OTP,
            edu: true
        })

        const token = getRandomToken()
        // store OTP to cache
        putOTP(token, { userId: user._id, OTP: OTP }, constants.student)
        //return 
        return { token }
    }

    static async studentVerify({user, OTP, token}) { 
        const storedOTP = getOTP(token, constants.student)
        if (!storedOTP) throw new BadRequestError('Verify student failed', 'Token is invalid')
        if (user._id !== storedOTP.userId ) throw new ForbiddenError('Verify student failed', 'Access denied')
        if (OTP !== storedOTP.OTP) throw new BadRequestError('Verify student failed', 'OTP is invalid')
        return 'Verify student success'
    }

    
}


module.exports = SubscriptionService