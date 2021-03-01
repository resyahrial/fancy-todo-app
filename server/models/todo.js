"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: `Title can't be empty`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: `Description can't be empty`,
          },
        },
      },
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: `Due date can't be empty`,
          },
          isDate: {
            args: true,
            msg: `Due date must be on date format`,
          },
          isNotPast(value) {
            const currDate = new Date();
            if (value <= currDate) {
              throw new Error(`Date has passed`);
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
      hooks: {
        beforeCreate(todo) {
          todo.status = "Progress";
        },
      },
    }
  );
  return Todo;
};
