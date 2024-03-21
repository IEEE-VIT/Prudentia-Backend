const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/init");
require("./config/passport");
require("./middleware/checkJWT");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const userAuthMiddleware = passport.authenticate("checkJWT", {
  session: false,
});

const googleAuthRoute = require("./routes/googleAuth");
const userRoute = require("./routes/user.route");
const teamRoute = require("./routes/team.route");
const submissionRoute = require("./routes/submissions.route");

app.use("/auth", googleAuthRoute);
app.use("/user", userAuthMiddleware, userRoute);
app.use("/team", userAuthMiddleware, teamRoute);
app.use("/submit", userAuthMiddleware, submissionRoute);

app.get("/", (req, res) => {
  res.send("API is up and running !!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port:", PORT));
