const { sequelize, DataTypes } = require("../config/database.config");
const VisaApplication = require("./visa-application"); // Import VisaApplication model

const Document = sequelize.define("Document", {
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
});

VisaApplication.hasMany(Document, { foreignKey: "applicationId" });
Document.belongsTo(VisaApplication, { foreignKey: "applicationId" });

module.exports = Document;
