const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { checkPassword } = require("../helpers");

class Controller {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = { email, password };
      const newUser = await User.create(user);
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    } catch (err) {
      const errorMessage = {
        status: 500,
        message: "Internal Server Error",
      };

      let message = "";
      if (err.msg) {
        message = err.msg;
      } else if (err.errors) {
        message = err.errors[0].message;
      } else {
        message = "Some attributes not provided";
      }

      if (message !== "") {
        errorMessage.status = 400;
        errorMessage.message = `Bad Request: ${message}`;
      }

      res.status(errorMessage.status).json({
        message: errorMessage.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const newUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!newUser) {
        throw new Error("Invalid username / password");
      }

      if (!checkPassword(password, newUser.password)) {
        throw new Error("Invalid username / password");
      }

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    } catch (err) {
      const errorMessage = {
        status: 500,
        message: "Internal Server Error",
      };

      if (err.msg || err.message) {
        errorMessage.status = 404;
        errorMessage.message = err.msg || err.message;
      } else {
        errorMessage.status = 400;
        if (err.errors) {
          errorMessage.message = `Bad Request: ${err.errors[0].message}`;
        } else {
          errorMessage.message = `Bad Request: Some attributes not provided`;
        }
      }

      res.status(errorMessage.status).json({
        message: errorMessage.message,
      });
    }
  }
}

module.exports = Controller;
