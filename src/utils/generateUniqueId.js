const crypto = require("crypto");

module.exports = function generateUniqueId() {
  return crypto.randomBytes(9).toString("HEX");
}

