"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(28),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(90),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Enter in the format name@example.com",
          },
        },
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
