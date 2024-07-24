const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/database.config");
const VisaApplication = require("./visa-application"); // Import VisaApplication model

class Document extends Model {}
Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: VisaApplication,
        key: "id",
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Document",
    freezeTableName: true,
    tableName: "document",
  }
);

VisaApplication.hasMany(Document, { foreignKey: "applicationId" });
Document.belongsTo(VisaApplication, { foreignKey: "applicationId" });

module.exports = Document;
