const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Country model
class Country extends Model {}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    countryName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    flagUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Country",
    freezeTableName: true,
    tableName: "country",
  }
);

module.exports = Country;
