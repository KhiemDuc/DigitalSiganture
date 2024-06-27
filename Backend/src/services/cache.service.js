const NodeCache = require("node-cache");
const cache = new NodeCache();

/* 
cache : {
    *** cache OTPs ***
    OTPs: {
        type: string,
        ...data(value)
    },
    tokens: {
        token1: userId1,
        token2: userId2,
    },
    *** cache subscription info ***
    subscriptions: {
        userId1: {
            token: string,
            plan: string
        },
        userId2: {
            token: string,
            plan: string
        }
    },
    *** cache publicKey to verify ***
    publicKeys: {
      userId: {
        token,
        publicKey,
        originalMessage
      }
    }
}
*/

/**
 *
 * @param {string} token
 * @param {{}} value
 * @param {string} type
 * @returns {Object}
 */

const putOTP = (token, value, type) => {
  let otpCache = cache.get("OTPs");
  if (otpCache === undefined) otpCache = {};
  otpCache[token] = { ...value, type: type };
  return cache.set("OTPs", otpCache, 180000);
};
const getOTP = (token, type) => {
  let otpCache = cache.get("OTPs");
  if (otpCache === undefined) otpCache = {};
  if (otpCache[token]?.type === type) return { ...otpCache[token] };
  return null;
};

const delOTP = (token) => {
  const otpCache = cache.get("OTPs");
  delete otpCache[token];
  return cache.set("OTPs", otpCache);
};

const putToken = (token, userId) => {
  let tokens = cache.get("tokens");
  if (tokens === undefined) tokens = {};
  if (tokens[token]) return null;
  tokens[token] = userId;
  cache.set("tokens", tokens);
  return true;
};
const getToken = (token) => {
  let tokens = cache.get("tokens");
  if (tokens === undefined) {
    tokens = {};
    cache.set("tokens", tokens);
  }
  return tokens[token];
};

const delToken = (token) => {
  let tokens = cache.get("tokens");
  if (tokens === undefined) {
    tokens = {};
    cache.set("tokens", tokens);
  }
  if (tokens[token]) {
    tokens[token] = undefined;
    cache.set("tokens", tokens);
    return false;
  }
  return true;
};

const getSubToken = (userId) => {
  let cached = cache.get("subscriptions");
  if (cached === undefined) cached = {};
  return cached[userId];
};

const putSubToken = (userId, token, plan) => {
  let cached = cache.get("subscriptions");
  if (cached === undefined) cached = {};
  cached[userId] = { token, plan };
  cache.set("subscriptions", { ...cached });
  return true;
};

const delSubToken = (userId) => {
  let cached = cache.get("subscriptions");
  if (cached === undefined) cached = {};
  delete cached[userId];
  cache.set("subscriptions", { ...cached });
  return true;
};

const getPubKey = (userIdStr) => {
  let cached = cache.get("publicKeys");
  if (cached === undefined) cached = {};
  return cached[userIdStr];
};

const putPubKey = (userIdStr, data) => {
  let cached = cache.get("publicKeys");
  if (cached === undefined) cached = {};
  cached[userIdStr] = data;
  cache.set("publicKeys", cached);
  return data;
};

const delPubKey = (userIdStr) => {
  let cached = cache.get("publicKeys");
  if (cached === undefined) cached = {};
  delete cached[userIdStr];
  cache.set("publicKeys", cached);
  return true;
};
module.exports = {
  putOTP,
  getOTP,
  delOTP,
  putToken,
  getToken,
  delToken,
  getSubToken,
  delSubToken,
  putSubToken,
  getPubKey,
  putPubKey,
  delPubKey,
};
