const express = require("express");
const router = express.Router();
const submitController = require("../controller/submissions.controller");

router.post("/r0", submitController.r0);
// router.post("/submit/r2", submitController.round2);
// router.post("/submit/r3", submitController.round3);

module.exports = router;
