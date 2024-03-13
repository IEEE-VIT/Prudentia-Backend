const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();
require("dotenv").config({ path: "./credentials.env" });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from node api updated");
});

try {
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

  sequelize.authenticate();
  console.log("Connection has been established successfully.");
  module.exports = sequelize;
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
