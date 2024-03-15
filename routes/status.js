const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const statusController = require("../controller/status");

router.get("/status/", statusController.getstatus);

module.exports = router;
