const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the TravelHistoryInformation model
class TravelHistoryInformation extends Model {}

TravelHistoryInformation.init(
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
    previousVisas: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    travelHistory: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TravelHistoryInformation",
    freezeTableName: true,
    tableName: "travel-history-information",
  }
);

User.hasMany(TravelHistoryInformation, { foreignKey: "userId" });
TravelHistoryInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = TravelHistoryInformation;
