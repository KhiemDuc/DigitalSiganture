const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secretKey: {
        type: Buffer,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    }, 
    refreshTokenUsed: {
        type: [String],
        default: []
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    }
}, {
    timestamps: true,
    collection: 'Users'
})

module.exports = mongoose.model('User', UserSchema)
