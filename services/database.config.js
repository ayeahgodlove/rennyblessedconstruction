const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const config = require("../config/config.json");
// const User = require('../models/user');
// const Application = require('../models/visa-application');
// const Document = require('../models/document');

// Determine the environment
const env = process.env.NODE_ENV || "development";
const configEnv = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  {
    host: configEnv.host,
    dialect: configEnv.dialect,
  }
);

async function dbAuthenticate() {
  try {
    await sequelize.authenticate();
    sequelize.sync().then(() => {
      console.log("Database & tables created!");
    });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Export the sequelize instance and DataTypes for model definition
module.exports = { sequelize, DataTypes, dbAuthenticate };
