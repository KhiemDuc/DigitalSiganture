// module.exports = (sequelize, Sequelize) => {
//     const UserInfo = sequelize.define('UserInfo', {
//         firstName: {
//             type: Sequelize.DataTypes.STRING,
//         },
//         lastName: {
//             type: Sequelize.DataTypes.STRING
//         },
//         email: {
//             type: Sequelize.DataTypes.STRING,
//             validate: {
//                 is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
//             }
//         },
//         phoneNumber: {
//             type: Sequelize.DataTypes.STRING,
//             validate: {
//                 is: /^0\d{9}$/
//             }
//         },
//         address: {
//             type: Sequelize.DataTypes.STRING,
//         },
//         CCCD: {
//             type: Sequelize.DataTypes.STRING,
//             validate: {
//                 is: /^0\d{11}$/ 
//             }
//         },
//         gender: {
//             type: Sequelize.DataTypes.CHAR,
//         },
//         dateOfBirth: {
//             type: Sequelize.DataTypes.DATE
//         },
//         nationality: {
//             type: Sequelize.DataTypes.STRING
//         },
//         placeOfOrigin: {
//             type: Sequelize.DataTypes.STRING
//         }
//     })
//     return UserInfo
// }

const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phoneNumber: {
        type: String,
        match: /^0\d{9}$/
    },
    address: {
        type: String,
    },
    CCCD: {
        type: String,
        match: /^0\d{11}$/
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    dateOfBirth: {
        type: Date
    },
    nationality: {
        type: String
    },
    placeOfOrigin: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'UserInfo'
})

module.exports = mongoose.model('UserInfo', UserInfoSchema)




