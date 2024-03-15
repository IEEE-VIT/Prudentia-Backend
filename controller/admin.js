const Team = require("../models/TeamModel");

const adminController = {
  suggestion: async (req, res) => {
    try {
      const { suggestion, team_code } = req.body;

      const team = await Team.findOne({ where: { team_code } });

      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      await Team.update({ suggestion }, { where: { team_code } });

      res.json({ message: "Suggestion updated successfully" });
    } catch (error) {
      console.error("Error updating suggestion:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = adminController;
