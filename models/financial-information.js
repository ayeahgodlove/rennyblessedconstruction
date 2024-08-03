const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the FinancialInformation model
class FinancialInformation extends Model {}

FinancialInformation.init(
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
    proofOfFunds: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    incomeDetails: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    accommodationDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "FinancialInformation",
    freezeTableName: true,
    tableName: "financial-information",
  }
);

User.hasMany(FinancialInformation, { foreignKey: "userId" });
FinancialInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = FinancialInformation;
