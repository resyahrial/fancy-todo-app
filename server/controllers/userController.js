const { User } = require("../models");
const { checkPassword, generateToken } = require("../helpers");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = { email, password };
      const newUser = await User.create(user);

      res.status(200).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!newUser) {
        throw { name: "Invalid username / password" };
      }

      if (!checkPassword(password, newUser.password)) {
        throw { name: "Invalid username / password" };
      }

      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      res.status(200).json({ accessToken: token });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
