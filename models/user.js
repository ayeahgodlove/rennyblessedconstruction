const { sequelize, DataTypes } = require("../config/database.config");

// Define the User model
const User = sequelize.define("User", {
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
});

module.exports = User;
