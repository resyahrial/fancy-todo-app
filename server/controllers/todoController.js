const { Todo } = require("../models");

class Controller {
  static async addTodo(req, res, next) {
    try {
      const { title, description, due_date } = req.body;
      const newTodo = {
        title,
        description,
        due_date,
        UserId: req.currUser.id,
      };

      const todo = await Todo.create(newTodo);

      res.status(201).json({
        todo,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async findAll(req, res, next) {
    try {
      const todos = await Todo.findAll({
        where: {
          UserId: req.currUser.id,
        },
        order: [["updatedAt", "DESC"]],
      });
      res.status(200).json(todos);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        throw { name: "Data Not Found" };
      }

      res.status(200).json(todo);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const prevTodo = await Todo.findByPk(id);
      if (!prevTodo) {
        throw { name: "Data Not Found" };
      }

      const { status, title, description, due_date } = req.body;
      const newTodo = { status, title, description, due_date };

      const todo = await Todo.update(newTodo, {
        where: {
          id,
        },
        returning: true,
      });

      res.status(200).json(todo[1][0]);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const id = req.params.id;
      const prevTodo = await Todo.findByPk(id);
      if (!prevTodo) {
        throw { name: "Data Not Found" };
      }

      const newTodo = {
        status: req.body.status || "",
      };

      const todo = await Todo.update(newTodo, {
        where: {
          id,
        },
        fields: ["status"],
        returning: true,
      });

      res.status(200).json(todo[1][0]);
    } catch (err) {
      console.log(err);
      next({
        data: err,
      });
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTodo = await Todo.destroy({ where: { id } });
      if (!deletedTodo) {
        throw { name: "Data Not Found" };
      }

      res.status(200).json({ message: "Todo Success to Delete" });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
