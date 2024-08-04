const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the VisaApplication model
class VisaApplication extends Model {}

VisaApplication.init(
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
    status: {
      type: DataTypes.ENUM("submitted", "under review", "approved", "rejected"),
      allowNull: false,
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reviewDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "VisaApplication",
    freezeTableName: true,
    tableName: "visaApplication",
  }
);

User.hasMany(VisaApplication, { foreignKey: "userId" });
VisaApplication.belongsTo(User, { foreignKey: "userId" });

module.exports = VisaApplication;
