const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the EmploymentInformation model
class EmploymentInformation extends Model {}

EmploymentInformation.init(
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
    occupation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    employerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    employerAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    employerPhone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    educationBackground: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "EmploymentInformation",
    freezeTableName: true,
    tableName: "employment-information",
  }
);

User.hasMany(EmploymentInformation, { foreignKey: "userId" });
EmploymentInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = EmploymentInformation;
