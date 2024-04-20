const NodeCache = require('node-cache')
const cache = new NodeCache();


const putOTP = (token, value, type) => {
    let otpCache = cache.get('OTPs');
    if (otpCache === undefined) otpCache = {}
    otpCache[token] = {...value, type: type}
    return cache.set('OTPs', otpCache, 180000);
}
const getOTP = (token, type) => {
    let otpCache = cache.get('OTPs')
    if (otpCache === undefined) otpCache = {}
    if (otpCache[token]?.type === type)
        return {...otpCache[token]}
    return null
}

const delOTP = token => {
    const otpCache = cache.get('OTPs')
    delete otpCache[token]
    return cache.set('OTPs', otpCache)
}

const putToken = (token, userId) => {
    let tokens = cache.get('tokens');
    if (tokens === undefined) tokens = {};
    if (tokens[token]) return null;
    tokens[token] = userId;
    cache.set('tokens' ,tokens)
    return true
}
const getToken = (token) => {
    let tokens = cache.get('tokens')
    if (tokens === undefined) {
        tokens = {}
        cache.set('tokens', tokens)
    }
    return tokens[token]
}


const delToken = (token) => {
    let tokens = cache.get('tokens')
    if (tokens === undefined) {
        tokens = {} 
        cache.set('tokens', tokens)
    }
    if (tokens[token]) {
        tokens[token] = undefined
        cache.set('tokens', tokens) 
        return false
    } 
    return true
}

const getSubToken = (userId) =>  {
    let cached = cache.get('subscription')
    if (cached === undefined) cached = {}
    return cached[userId]
}

const putSubToken = (userId, token, plan) => {
    let cached = cache.get('subscription')
    if (cached === undefined) cached = {} 
    cached[userId] = {token, plan};
    cache.set('subscription', {...cached})
    return true
}

const delSubToken = (userId) => {
    let cached = cache.get('subscription')
    if (cached === undefined) cached = {} 
    delete cached[userId]
    cache.set('subscription', {...cached})
    return true
}


module.exports = {
    putOTP,
    getOTP,
    delOTP,
    putToken,
    getToken,
    delToken,
    getSubToken,
    delSubToken,
    putSubToken
}