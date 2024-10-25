const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const Category = require("./category");

class Project extends Model {}
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    projectUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    projectDate: {
      type: DataTypes.DATE,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Project",
    freezeTableName: true,
    tableName: "project",
  }
);

Category.hasMany(Project, { foreignKey: "categoryId" });
Project.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Project;
