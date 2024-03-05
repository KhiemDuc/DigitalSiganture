module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {type: Sequelize.DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, unique: true},
        userName: {type: Sequelize.DataTypes.STRING, allowNull: false},
        password: {type: Sequelize.DataTypes.STRING, allowNull: false}
    })
    return User
}