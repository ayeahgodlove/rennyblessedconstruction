const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Testimonial model
class Testimonial extends Model {}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    personName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    profession: { 
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    testimony: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Testimonial",
    freezeTableName: true,
    tableName: "testimonial",
  }
);

module.exports = Testimonial;
