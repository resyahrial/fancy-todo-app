const { hashPassword, checkPassword } = require("./passwordHandler");
const { generateToken, decodedToken } = require("./tokenHandler");

module.exports = {
  hashPassword,
  checkPassword,
  generateToken,
  decodedToken,
};
