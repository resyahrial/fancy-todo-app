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
      Todo.belongsTo(models.User, { foreignKey: "UserId" });
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
      status: {
        type: DataTypes.BOOLEAN,
      },
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
          isAfter: {
            args: [`${new Date()}`],
            msg: "Date has passed",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Todo",
      hooks: {
        beforeCreate(todo) {
          todo.status = false;
        },
      },
    }
  );
  return Todo;
};
