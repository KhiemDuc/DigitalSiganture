const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "DigitalSignature";

module.exports = {
  host,
  port,
  dbName,
};
