const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Service model
class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Service",
    freezeTableName: true,
    tableName: "service",
  }
);

module.exports = Service;
