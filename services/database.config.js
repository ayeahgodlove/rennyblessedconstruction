// sequelize.ts
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const mysql2 = require("mysql2");

// Determine the environment
const env = process.env.NODE_ENV || "development";
const configEnv = config[env];

const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  {
    host: configEnv.host,
    dialect: configEnv.dialect,
    dialectModule: mysql2,
    benchmark: true,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed", error);
  }
})();

module.exports = { sequelize, DataTypes };
