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

  static async findAll(req, res) {
    try {
      const todos = await Todo.findAll();
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).jsno({
        message: "Internal Server Error",
      });
    }
  }

  static async findById(req, res) {
    try {
      const id = req.params.id;
      const todo = await Todo.findByPk(id);
      if (todo === null) {
        throw new Error("Data Not Found");
      }
      res.status(200).json(todo);
    } catch (err) {
      const errorMessage = {
        status: 500,
        message: "Internal Server Error",
      };

      if (err.message) {
        errorMessage.status = 404;
        errorMessage.message = err.message;
      }

      res.status(errorMessage.status).json({
        message: errorMessage.message,
      });
    }
  }
}

module.exports = Controller;
