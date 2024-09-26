const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const Project = require("./project");

class Picture extends Model {}
Picture.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "project", // References the project table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Picture",
    freezeTableName: true,
    tableName: "picture",
  }
);

Project.hasMany(Picture, { foreignKey: 'projectId', as: 'pictures' });
Picture.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Picture;
