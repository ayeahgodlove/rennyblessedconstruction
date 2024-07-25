const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Feature model
class Feature extends Model {}

Feature.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    featureName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Feature",
    freezeTableName: true,
    tableName: "feature",
  }
);

module.exports = Feature;
