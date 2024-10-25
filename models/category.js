const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Category model
class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    freezeTableName: true,
    tableName: "category",
  }
);

module.exports = Category;
