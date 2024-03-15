const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();
require("dotenv").config({ path: "./credentials.env" });

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    authentication: {
      type: "md5",
    },
  },
});

// Export the Sequelize instance for use in other modules
module.exports = sequelize;
