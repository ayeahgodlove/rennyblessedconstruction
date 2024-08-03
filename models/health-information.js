const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the HealthInformation model
class HealthInformation extends Model {}

HealthInformation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    medicalHistory: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vaccinationRecords: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "HealthInformation",
    freezeTableName: true,
    tableName: "health-information",
  }
);

User.hasMany(HealthInformation, { foreignKey: "userId" });
HealthInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = HealthInformation;
