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
    isStudent: {
        type: Boolean,
        default: false
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    },
    studentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
    timestamps: true,
    collection: 'Users'
})

module.exports = mongoose.model('User', UserSchema)
