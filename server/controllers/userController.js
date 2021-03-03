const { OAuth2Client } = require("google-auth-library");

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

  static async oauth(req, res, next) {
    try {
      const token = req.body.token;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: `${Math.floor(Math.random() * 1e6)}`,
        },
      });

      const accessToken = generateToken({
        id: user[0].id,
        email: user[0].email,
      });
      res.status(200).json({ accessToken: accessToken });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
