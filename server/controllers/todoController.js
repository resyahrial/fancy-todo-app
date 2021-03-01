const { Todo } = require("../models");

class Controller {
  static async addTodo(req, res) {
    try {
      const { title, description, status, due_date } = req.body;
      const newTodo = { title, description, status, due_date };
      const todo = await Todo.create(newTodo);

      res.status(201).json({
        todo,
      });
    } catch (err) {
      const errorMessage = {
        status: 500,
        msg: "Internal Server Error",
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
        errorMessage.msg = `Bad Request: ${message}`;
      }

      res.status(errorMessage.status).json({
        message: errorMessage.msg,
      });
    }
  }
}

module.exports = Controller;
