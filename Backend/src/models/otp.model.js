const mongoose = require('mongoose')

const OTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        emun: ['verify email', 'reset password'],
    },
    value: {
        type: String,
        minLength: 6,
        maxLength: 6
    },
    //valid time
    exp: {
        type: Date,
    }, 
    retry: {
        type: Number,
        default: 0
    }, 
    attempts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: 'OTP'
})

module.exports = mongoose.model('OTP', OTPSchema)


