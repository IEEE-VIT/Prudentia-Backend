const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Team = require("../models/TeamModel");
const Deadline = require("../models/deadlinesModel");
const Registered = require("../models/registeredModel");

const addEntryToAllTables = async (req, res) => {
  try {
    const newUser = await User.create({
      email_id: "arthy.2022@vitstudent.ac.in",
      profile_pic: null,
      username: "arthy",
      mobile_number: "88",
      team_code: "TEAM001",
    });

    const newTeam = await Team.create({
      team_code: "TEAM001",
      team_name: "Team 1",
      leader_email: "arthy.2022@vitstudent.ac.in",
    });

    const newDeadline = await Deadline.create({
      round_number: 1,
      end_date: "2024-03-22",
      end_time: "22:05:00",
    });

    const newRegistered = await Registered.create({
      email_id: "arthy.2022@vitstudent.ac.in",
    });

    res.json({
      message: "Entries added to all tables successfully",
      newUser,
      newTeam,
      newDeadline,
      newRegistered,
    });
  } catch (error) {
    console.error("Error adding entries to tables:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/addEntries", addEntryToAllTables);

module.exports = router;
