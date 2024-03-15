const Team = require("../models/TeamModel");
const User = require("../models/userModel");

const teamController = {
  getdetails: async (req, res) => {
    try {
      const { team_code } = req.body;

      const team = await Team.findByPk(team_code);

      if (!team) {
        return res.status(404).json({ error: "Team not found for the user" });
      }

      res.json({ team });
    } catch (error) {
      console.error("Error fetching team details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  createteam: async (req, res) => {
    try {
      const { team_code, team_name, email_id } = req.body;

      await User.update(
        { team_code },
        {
          where: { email_id },
        }
      );

      await Team.create({
        team_code,
        team_name,
        leader_email: email_id,
      });

      res.json({ message: `Team created with code: ${team_code}` });
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  jointeam: async (req, res) => {
    try {
      const { code } = req.params;
      const { email_id } = req.body;

      await User.update(
        { team_code: code },
        {
          where: { email_id: email_id },
        }
      );

      res.json({ message: "User joined team with code: ${code}" });
    } catch (error) {
      console.error("Error joining team:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = teamController;
