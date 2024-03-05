module.exports = (sequelize, Sequelize) => {
    const Certificate = sequelize.define('Certificate', {
        keyPem: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    })
    return Certificate
}