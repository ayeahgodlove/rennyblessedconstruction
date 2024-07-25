const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Training model
class Training extends Model {}

Training.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    trainingName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    desription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Training",
    freezeTableName: true,
    tableName: "training",
  }
);

module.exports = Training;
