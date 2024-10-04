const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");

// Define the Team model
class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    personName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    profession: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    facebookUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    twitterUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    linkedInUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    instagramUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Team",
    freezeTableName: true,
    tableName: "team",
  }
);

module.exports = Team;
