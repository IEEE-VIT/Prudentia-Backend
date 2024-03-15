const express = require("express");
const sequelize = require("./db.js");
const app = express();
const addEntriesRouter = require("./routes/entry");
const teamRoutes = require("./routes/team.js");

sequelize.authenticate();
sequelize.sync();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from node api updated");
});

app.post("/addEntries", addEntriesRouter);
