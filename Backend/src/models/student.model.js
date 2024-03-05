module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('Student', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        // fullName: {
        //     type: Sequelize.DataTypes.STRING,
        //     allowNull: false
        // },
        firstName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.DataTypes.DATE,
        },
        gender: Sequelize.DataTypes.CHAR // M: Male, F: Female
    })
    return Student
}