const { decodedToken } = require("../helpers");
const { Todo } = require("../models");

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    next({
      data: {
        name: "Please Login First",
      },
    });
    return;
  }

  const { id, email } = decodedToken(req.headers.access_token);
  req.currUser = {
    id,
    email,
  };
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
