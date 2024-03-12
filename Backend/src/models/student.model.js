const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    }
}, {
    timestamps: true,
    collection: 'Students'
})


module.exports = mongoose.model('Student', StudentSchema)



