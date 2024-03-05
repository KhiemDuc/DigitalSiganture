module.exports = (sequelize, Sequelize) => {
    const UserInfo = sequelize.define('UserInfo', {
        firstName: {
            type: Sequelize.DataTypes.STRING,
        },
        lastName: {
            type: Sequelize.DataTypes.STRING
        },
        phoneNumber: {
            type: Sequelize.DataTypes.STRING,
            validate: {
                is: /^0\d{9}$/
            }
        },
        address: {
            type: Sequelize.DataTypes.STRING,
        },
        CCCD: {
            type: Sequelize.DataTypes.STRING,
            validate: {
                is: /^0\d{11}$/ 
            }
        },
        gender: {
            type: Sequelize.DataTypes.CHAR,
        },
        dateOfBirth: {
            type: Sequelize.DataTypes.DATE
        },
        nationality: {
            type: Sequelize.DataTypes.STRING
        },
        placeOfOrigin: {
            type: Sequelize.DataTypes.STRING
        }
    })
    return UserInfo
}