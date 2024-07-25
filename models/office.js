const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Office model
class Office extends Model {}

Office.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    officeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Office",
    freezeTableName: true,
    tableName: "office",
  }
);

module.exports = Office;
