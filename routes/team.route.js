const express = require("express");
const router = express.Router();
const teamController = require("../controller/team.controller");

router.get("/", teamController.getTeam);
router.get("/details/:code", teamController.getTeamDetailsByCode);
router.post("/create", teamController.createTeam);
router.post("/join/:code", teamController.joinTeam);
router.post("/leave", teamController.leaveTeam);

module.exports = router;
