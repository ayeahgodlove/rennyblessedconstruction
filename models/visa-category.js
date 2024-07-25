const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the VisaCategory model
class VisaCategory extends Model {}

VisaCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    visaCategoryName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VisaCategory",
    freezeTableName: true,
    tableName: "visaCategory",
  }
);

module.exports = VisaCategory;
