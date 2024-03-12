const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from node api updated");
});

try {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "aws-0-ap-south-1.pooler.supabase.com",
    username: "postgres.fgwehrnaowvotpierxbd",
    password: "Prudentia@2023",
    database: "postgres",
    dialectOptions: {
      authentication: {
        type: "md5",
      },
    },
  });

  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
