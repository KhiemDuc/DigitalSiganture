const { BadRequestError } = require('../core/error.response')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {createTokens, createSecretKey} = require('../utils/keyToken')
const pickFields = require('../utils/pickFields')
const UserInfo = require('../models/userInfo.model')
const omitFields = require('../utils/omitFields')
const checkNotNull = require('../utils/checkNotNull')
const { generateOTP } = require('./otp.service')
const OTP = require('../models/otp.model')
const { sendMail } = require('./email.service')
const block = require('../utils/blockGenOTP')
const blockAttempts = require('../utils/blockVerifyOTP')
const Certificate = require('../models/certificate.model')
const cacheService = require('./cache.service')
class AccessService {
    static singUp = async ({ email, userName, password, phoneNumber, firstName, lastName }) => {

        if (!email || !userName || !password || !firstName || !lastName) throw new BadRequestError('Sign up failed', 'Missing information')

        const foundUser = await User.findOne({
            userName: userName
        })
        if (foundUser) throw new BadRequestError('Sign up failed', 'User name existed')

        const foundInfo = await UserInfo.findOne({
            email: email
        })
        if (foundInfo) throw new BadRequestError('Sign up failed', 'Email or password existed')

        const signUpToken = crypto.randomBytes(256).toString('hex');
        const OTPgen = generateOTP()
        try {
            await sendMail(email, OTPgen)
        } catch(err) {
            throw new BadRequestError('Sign up failed', 'unknown reason')
        }
        if (cacheService.putOTP(signUpToken,{ 
            email, userName, password, phoneNumber, firstName, lastName, 
            OTP: OTPgen
        }))
        return { signUpToken: signUpToken };
    }

    static verifySignup = async ({token, otp}) => {
        const foundOTP = cacheService.getOTP(token)
        if ( !foundOTP || !foundOTP.OTP || foundOTP.OTP !== otp) throw new BadRequestError('Verify failed', 'OTP is invalid') 
        const {email, userName, password, phoneNumber, firstName, lastName} = foundOTP;
        
        const secret = createSecretKey()
        
        password = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            email, userName, password, secretKey: secret.export()
        })

        const tokens = createTokens({
            payload: {
                _id: newUser._id,
                userName: userName,
                email: email
            },
            key: secret 
        })
        const userInfo = await UserInfo.create({
            email, firstName, lastName, phoneNumber
        })
        const cert = await Certificate({userId: newUser._id})
        newUser.userInfo = userInfo._id
        newUser.refreshToken = tokens.refreshToken
        newUser.certificate = cert
        await newUser.save()
        return {
            ...pickFields(newUser, ['_id', 'userName', 'userInfo.verified']),
            ...tokens
        }
    }

    static signIn = async (userName, password) => {
        const foundUser = await User.findOne({userName}).populate('userInfo')
        if ( !foundUser ) throw new BadRequestError('Sign in failed', 'User name or password is incorrect')
        const result = bcrypt.compareSync(password, foundUser.password)

        if ( !result ) throw new BadRequestError('Sign in failed', 'User name or password is incorrect')

        const secret = createSecretKey() 

        const tokens = createTokens({key: secret, payload : {
            _id: foundUser._id,
            userName: foundUser.userName,
            email: foundUser.userInfo.email
        }})

        foundUser.secretKey = secret.export()
        if (foundUser.refreshToken)  foundUser.refreshTokenUsed.push(foundUser.refreshToken)
        foundUser.refreshToken = tokens.refreshToken

        await foundUser.save()

        return {
            ...pickFields(foundUser, ['_id', 'userName', 'foundUser.verified']),
            ...tokens
        }
    }

    static signOut = async (foundUser) => {
        const { refreshToken } = foundUser
        if (refreshToken) foundUser.refreshTokenUsed.push(refreshToken)
        foundUser.refreshToken = null
        foundUser.secretKey = null
        await foundUser.save()

        return {
            ...pickFields(foundUser, ['_id', 'userName'])
        }
    }

    static refreshToken = async (foundUser) => {
        const newSecret = createSecretKey()

        const userInfo = UserInfo.findById(foundUser.userInfo)

        const newTokens = createTokens({key: newSecret, payload: {
            _id: foundUser._id,
            userName: foundUser.userName,
            email: userInfo.email
        }})

        foundUser.secretKey = newSecret.export()
        foundUser.refreshTokenUsed.push(foundUser.refreshToken)
        foundUser.refreshToken = newTokens.refreshToken

        await foundUser.save()

        return {
            _id: foundUser._id,
            userName: foundUser.userName,
            ...newTokens
        }

    }

    static getUserInfo = async (user, id) => {
        if ( user._id.toString() !== id) throw new BadRequestError('Get user information failed','client id is invalid')
        const userInfo = await UserInfo.findById(user.userInfo)
        user.userInfo = userInfo
        return {
            ...pickFields(user, [ '_id', 'userName']),
            ...omitFields(userInfo._doc, ['_id', '__v', 'createdAt', 'updatedAt'])
        }
    }

    static changeUserInfo = async (user, payload) => {
        const {firstName, lastName, CCCD ,address, gender, dateOfBirth, placeOfOrigin, nationality, avatar, background} = payload
        if (!checkNotNull(firstName, lastName, address, CCCD, gender, dateOfBirth, placeOfOrigin, nationality, avatar, background)) {
            throw new BadRequestError('Change user info failed', 'Missing information')
        } 
        const foundInfo = await UserInfo.findById(user.userInfo)
        // check CCCD

        //end check
        foundInfo.firstName = firstName
        foundInfo.lastName = lastName
        foundInfo.CCCD = CCCD
        foundInfo.address = address
        foundInfo.gender = gender
        foundInfo.dateOfBirth = dateOfBirth
        foundInfo.placeOfOrigin = placeOfOrigin
        foundInfo.nationality = nationality
        foundInfo.avatar = avatar
        foundInfo.background = background
        try {
            await foundInfo.save()
        } catch(err) {
            throw new BadRequestError('Change user info failed', 'Some thing wrong, please check inputs again')
        }
        
        return 'Change user info success'
    }

    static changePassword = async (user, newPass) => {
        const newHashedPass = bcrypt.hashSync(newPass,10)

        user.password = newHashedPass
        await user.save()

        return true
    }
    static createOTP = async (user) => {
        const OTPgen = generateOTP();
        let foundOTP = await OTP.findOne({userId: user._id})
        if (!foundOTP) {
            foundOTP = new OTP({userId: user._id})
        }
        if (foundOTP.retry > 2) {
            block.set(foundOTP._id)
            throw new BadRequestError('Create OTP failed', 'Too many attemps')
        }
        foundOTP.type= 'Verify email'
        foundOTP.value= OTPgen
        foundOTP.exp= new Date(Date.now() + (300 * 1000))
        foundOTP.retry = foundOTP.retry + 1;

        await foundOTP.save()
        const foundInfo = await UserInfo.findById(user.userInfo)
        sendMail({
            to: foundInfo.email,
            OTP: OTPgen
        })
        return 'Create OTP success'
    }

    static verifyOTP = async (user, otp) => {
        const foundOTP = await OTP.findOne({userId: user._id})
        if (!foundOTP) throw new BadRequestError('Verify OTP failed', 'otp is not exist')
        if (foundOTP.attempts > 2) {
            blockAttempts.set(foundOTP._id)
            throw new BadRequestError('Verify OTP failed', 'Too many attempts, try again later')
        } 
        if (otp !== foundOTP.value || foundOTP.exp < new Date()) {
            console.log(foundOTP.attempts)
            foundOTP.attempts++
            await foundOTP.save()
            throw new BadRequestError('Verify OTP failed', 'OTP is not valid')
        } 
            
        foundOTP.type = null
        foundOTP.value = null
        foundOTP.exp = null
        foundOTP.retry = 0
        foundOTP.attempts = 0
        await foundOTP.save()
        await UserInfo.findByIdAndUpdate(user.userInfo, {
            $set: {
                verified: true
            }
        })

        return 'Verify OTP success'
    }

    static resetPassword = async (email) => {
        


    }
}


module.exports = AccessService