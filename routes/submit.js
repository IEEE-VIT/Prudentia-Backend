const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const submitController = require("../controller/submit");

router.post("/submit/r0", submitController.round0);
router.post("/submit/r2", submitController.round2);
router.post("/submit/r3", submitController.round3);

module.exports = router;
