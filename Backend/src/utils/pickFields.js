const _ = require("lodash");

module.exports = (object, fields) => {
  return _.pick(object, fields);
};
