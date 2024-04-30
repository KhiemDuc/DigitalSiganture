const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const createSecretKey = () => {
  return crypto.generateKeySync("hmac", { length: 512 });
};

const createTokens = ({ key, payload }) => {
  const accessToken = jwt.sign(payload, key, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, key, {
    expiresIn: "2 days",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = (token, secret) => {
  const decoded = jwt.verify(token, secret);

  return decoded;
};

module.exports = {
  createTokens,
  createSecretKey,
  verifyToken,
};
