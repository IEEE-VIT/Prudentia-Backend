const express = require("express");
const sequelize = require("./db.js");
const app = express();
const addEntriesRouter = require("./routes/entry");
const teamRoutes = require("./routes/team.js");
const submitRoutes = require("./routes/submit.js");
const statusRoutes = require("./routes/status.js");
const adminRoutes = require("./routes/admin.js");
const { getdetails, createteam, jointeam } = require("./controller/team.js");
const { round0, round2, round3 } = require("./controller/submit.js");
const { suggestion } = require("./controller/admin.js");
const { getstatus } = require("./controller/status.js");

sequelize.authenticate();
sequelize.sync();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/team/", getdetails);
app.post("/team/create", createteam);
app.post("/team/:code", jointeam);
app.post("/submit/r0", round0);
app.post("/submit/r2", round2);
app.post("/submit/r3", round3);
app.post("/admin/suggestion", suggestion);
app.get("/status/", getstatus);
app.post("/addEntries", addEntriesRouter);
