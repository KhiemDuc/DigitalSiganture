const NodeCache = require('node-cache')
const cache = new NodeCache();


const putOTP = (token, value) => {
    const otpCache = cache.get('OTPs');
    if (otpCache === undefined) otpCache = {}
    otpCache[token] = value
    return cache.set('OTPs', value, 180000);
}
const getOTP = (token) => {
    const otpCache = cache.get('OTPs')
    if (otpCache === undefined) otpCache = {}
    return otpCache[token]
}

const delOTP = token => {
    const otpCache = cache.get('OTPs')
    otpCache[token] = undefined
    return cache.set('OTPs', otpCache)
}

module.exports = {
    putOTP,
    getOTP,
    delOTP
}