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
      if (!todo) {
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

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { status, title, description, due_date } = req.body;
      const prevTodo = await Todo.findByPk(id);
      if (!prevTodo) {
        throw new Error("Data Not Found");
      }

      let todo, newTodo;
      newTodo = {
        status,
      };
      if (req.method === "PUT") {
        newTodo = {
          ...newTodo,
          title: title || prevTodo.title,
          description: description || prevTodo.description,
          due_date: due_date || prevTodo.due_date,
        };

        todo = await Todo.update(newTodo, {
          where: {
            id,
          },
          returning: true,
        });
      } else {
        todo = await Todo.update(newTodo, {
          where: {
            id,
          },
          fields: ["status"],
          returning: true,
        });
      }

      res.status(200).json(todo[1][0]);
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

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedTodo = await Todo.destroy({ where: { id } });
      if (!deletedTodo) {
        throw new Error("Data Not Found");
      }

      res.status(200).json({ message: "Todo Success to Delete" });
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
