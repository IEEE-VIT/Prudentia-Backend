const Team = require("../models/TeamModel");
const User = require("../models/userModel");

const r0 = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ error: "User not found" });
    }

    const team_code = req.user.team_code;

    if (!team_code) {
      return res.json({ popup: "You are not part of any team" });
    }

    const members = await User.findAll({
      where: { team_code: team_code },
    });

    if (members.length < 2) {
      return res.json({
        popup: "Team must consist of atleast 2 members to submit the link.",
      });
    }

    const team = await Team.findByPk(team_code);

    if (team.r0_ppt_link) {
      return res.json({ popup: "Link already submitted" });
    }

    if (req.user.email !== team.leader_email) {
      return res.json({ popup: "Only the team leader can submit the link" });
    }

    const { link } = req.body;

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
};

const submitController = { r0 };

module.exports = submitController;
