const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the TravelInformation model
class TravelInformation extends Model {}

TravelInformation.init(
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
    visaType: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    purposeOfVisit: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    arrivalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
    },
    durationOfStay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // unique: true,
    },
  },
  {
    sequelize,
    modelName: "TravelInformation",
    freezeTableName: true,
    tableName: "travel-information",
  }
);

User.hasMany(TravelInformation, { foreignKey: "userId" });
TravelInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = TravelInformation;
