const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the SecurityInformation model
class SecurityInformation extends Model {}

SecurityInformation.init(
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
    criminalRecord: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    detailsOfCriminalRecord: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    otherSecurityConcerns: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SecurityInformation",
    freezeTableName: true,
    tableName: "security-information",
  }
);

User.hasMany(SecurityInformation, { foreignKey: "userId" });
SecurityInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = SecurityInformation;
