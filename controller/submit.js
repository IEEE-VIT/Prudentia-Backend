const Team = require("../models/TeamModel");

const submitController = {
  round0: async (req, res) => {
    try {
      const { link, team_code } = req.body;

      await Team.update(
        { r0_ppt_link: link },
        {
          where: { team_code: team_code },
        }
      );

      res.json({ message: "Link for round 0 submitted successfully" });
    } catch (error) {
      console.error("Error submitting link for round 0:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  round2: async (req, res) => {
    try {
      const { link, team_code } = req.body;

      await Team.update(
        { r2_github_link: link },
        {
          where: { team_code: team_code },
        }
      );

      res.json({ message: "Link for round 2 submitted successfully" });
    } catch (error) {
      console.error("Error submitting link for round 2:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  round3: async (req, res) => {
    try {
      const { link, team_code } = req.body;

      await Team.update(
        { r3_ppt_link: link },
        {
          where: { team_code: team_code },
        }
      );

      res.json({ message: "Link for round 3 submitted successfully" });
    } catch (error) {
      console.error("Error submitting link for round 3:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = submitController;
