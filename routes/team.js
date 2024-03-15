const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const teamController = require("../controller/team");

router.get("/team/", teamController.getdetails);
router.post("/team/create", teamController.createteam);
router.post("/team/join/:code", teamController.jointeam);

module.exports = router;
