const axios = require("axios");

const TodoController = require("./todoController");
const UserController = require("./userController");

class HomeController {
  static async home(req, res, next) {
    try {
      const { data } = await axios.get(
        "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
      );
      if (data.status !== 200) {
        throw { name: "error get 3rd api" };
      }
      res.status(200).json(data.quotes[0]);
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = {
  TodoController,
  UserController,
  HomeController,
};
