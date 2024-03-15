const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const adminController = require("../controller/admin");

router.post("/admin/suggestion", adminController.suggestion);

module.exports = router;
