const _ = require('lodash')

module.exports = (object, fields) => {
    return _.omit(object, fields)
}




