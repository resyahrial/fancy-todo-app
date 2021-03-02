const { decodedToken } = require("../helpers");
const { Todo, User } = require("../models");

const authentication = async (req, res, next) => {
  if (!req.headers.access_token) {
    next({
      data: {
        name: "Please Login First",
      },
    });
    return;
  }

  try {
    const { id, email } = decodedToken(req.headers.access_token);
    const user = await User.findByPk(id);
    if (!user) {
      throw { name: "Invalid Token" };
    }

    if (user.email !== email) {
      throw { name: "Invalid Token" };
    }

    req.currUser = {
      id,
      email,
    };
  } catch (err) {
    next({
      data: err,
    });
  }

  next();
};

const authorization = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const userId = req.currUser.id || null;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      throw { name: "Data Not Found" };
    }

    if (todo.UserId !== userId) {
      throw { name: `You're not authorize` };
    }
    next();
  } catch (err) {
    next({
      data: err,
    });
  }
};

module.exports = {
  authentication,
  authorization,
};
