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
    fullName: {
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "super-admin"),
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
