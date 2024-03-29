const { BadRequestError } = require('../core/error.response')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {createTokens, createSecretKey} = require('../utils/keyToken')
const pickFields = require('../utils/pickFields')
const UserInfo = require('../models/userInfo.model')
const omitFields = require('../utils/omitFields')
class AccessService {
    static singUp = async ({ email, userName, password, phoneNumber, firstName, lastName }) => {

        if (!email || !userName || !password || !phoneNumber || !firstName || !lastName) throw new BadRequestError('Sign up failed', 'Missing information')

        const foundUser = await User.find({
            userName: userName
        })
        if (foundUser.length > 0 ) throw new BadRequestError('Sign up failed', 'User name existed')

        const foundInfo = await UserInfo.find({
            $or : [
                {email: email},
                {phoneNumber: phoneNumber}
            ]
        })
        if (foundInfo.length > 0) throw new BadRequestError('Sign up failed', 'Email or password existed')

        const secret = createSecretKey()
        
        password = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            email, userName, password, phoneNumber, secretKey: secret.export()
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
            email, phoneNumber, firstName, lastName
        })
        newUser.userInfo = userInfo._id
        newUser.refreshToken = tokens.refreshToken
        await newUser.save()
        return {
            ...pickFields(newUser, ['_id', 'userName']),
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
            ...pickFields(foundUser, ['_id', 'userName']),
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

    static changeUserInfo = async (id, payload) => {
        const {firstName, lastName, address, gender, dateOfBirth, placeOfOrigin} = payload
        
    }

    static changePassword = async (user, newPass) => {
        const newHashedPass = bcrypt.hashSync(newPass,10)

        user.password = newHashedPass
        await user.save()

        return true
    }

}


module.exports = AccessService