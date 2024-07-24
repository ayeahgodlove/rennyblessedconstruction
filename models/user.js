const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the User model
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("applicant", "officer", "admin", "super-admin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    freezeTableName: true,
    tableName: "user",
  }
);

module.exports = User;
