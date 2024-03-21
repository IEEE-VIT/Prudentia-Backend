const sequelize = require("./db");

sequelize
  .sync({ logging: console.log })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
