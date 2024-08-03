const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const User = require("./user");

// Define the PersonalInformation model
class PersonalInformation extends Model {}

PersonalInformation.init(
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
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
    },
    birthCountry: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
    gender: {
      type: DataTypes.STRING(25),
      allowNull: false,
      // unique: true,
    },
    maritalStatus: {
      type: DataTypes.STRING(25),
      allowNull: false,
      // unique: true,
    },
    passportNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
    passportIssueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
    },
    passportExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
    },
    passportIssuingCountry: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
  },
  {
    sequelize,
    modelName: "PersonalInformation",
    freezeTableName: true,
    tableName: "personal-information",
  }
);

User.hasMany(PersonalInformation, { foreignKey: "userId" });
PersonalInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = PersonalInformation;
