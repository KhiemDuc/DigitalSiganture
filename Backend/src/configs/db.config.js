module.exports = {
    HOST: "localhost",
    PORT: "1433",
    USER: "bach",
    PASSWORD: "1234",
    DB: "DigitalSignature",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};