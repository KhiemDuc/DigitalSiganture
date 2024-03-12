const { BadRequestError } = require('../core/error.response')
const User = require('../models/user.model')
class AccessService {
    static singUp = async ({ email, userName, password, phoneNumber }) => {
        const newUser = await User.create({
            email, userName, password, phoneNumber
        })

        return newUser
    }
}


module.exports = AccessService