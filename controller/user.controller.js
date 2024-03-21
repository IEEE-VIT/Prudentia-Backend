const Team = require("../models/TeamModel");

const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    team_code = req.user.team_code;
    if (team_code) {
      const team = await Team.findByPk(team_code);
      return res.json({ user: req.user, team });
    }
    res.json({ user: req.user, team: null });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUser };
