const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the SupporttingDocument model
class SupporttingDocument extends Model {}

SupporttingDocument.init(
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
    photograph: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    passport: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    invitationLetter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    travelInsurance: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SupporttingDocument",
    freezeTableName: true,
    tableName: "supportting-document",
  }
);

User.hasMany(SupporttingDocument, { foreignKey: "userId" });
SupporttingDocument.belongsTo(User, { foreignKey: "userId" });

module.exports = SupporttingDocument;
