const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the DigitalSignature model
class DigitalSignature extends Model {}

DigitalSignature.init(
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
    declaration: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    signature: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    signatureDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "DigitalSignature",
    freezeTableName: true,
    tableName: "digital-signature",
  }
);

User.hasMany(DigitalSignature, { foreignKey: "userId" });
DigitalSignature.belongsTo(User, { foreignKey: "userId" });

module.exports = DigitalSignature;
