const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");
require("./config/init");
require("./middleware/checkJWT");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const collectionsRouter = require("./routes/collections");
const googleAuth = require("./routes/googleAuth");
const userRouter = require("./routes/user");
const itemRouter = require("./routes/items");

const userAuthMiddleware = passport.authenticate("checkJWT", {
  session: false,
});

app.get("/", (req, res) => {
  res.send("API is up and running !!");
});

app.use("/user", userAuthMiddleware, userRouter);
app.use("/collections", userAuthMiddleware, collectionsRouter);
app.use("/items", userAuthMiddleware, itemRouter);
app.use("/auth", googleAuth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port:", PORT));