const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const config = require("../New folder/config/config.json");

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
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Export the sequelize instance and DataTypes for model definition
module.exports = { sequelize, DataTypes, dbAuthenticate };
