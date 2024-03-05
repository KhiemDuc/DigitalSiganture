const dbConfig = require("../configs/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.student = require("../models/student.model.js")(sequelize, Sequelize)
db.certificate = require('../models/certificate.model.js')(sequelize, Sequelize)
db.userInfo = require('../models/userInfo.model.js')(sequelize, Sequelize)
// relationship

db.user.hasOne(db.student, {
  foreignKey: {
    allowNull: false
  }
})
db.student.belongsTo(db.user)

db.user.hasOne(db.certificate, {
  foreignKey: {
    allowNull: false,
  }
})
db.certificate.belongsTo(db.user)

db.user.hasOne(db.userInfo, {
  foreignKey: {
    allowNull: false
  }
})
db.student.belongsTo(db.user)

module.exports = db;