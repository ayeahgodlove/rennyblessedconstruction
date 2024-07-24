const { sequelize, DataTypes } = require("../config/database.config");
const User = require("./user");

// Define the VisaApplication model
const VisaApplication = sequelize.define("VisaApplication", {
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
});

User.hasMany(VisaApplication, { foreignKey: 'userId' });
VisaApplication.belongsTo(User, { foreignKey: 'userId' });

module.exports = VisaApplication;
