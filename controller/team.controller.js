const { Op } = require("sequelize");
const Team = require("../models/TeamModel");
const User = require("../models/userModel");

const getTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    const team_code = req.user.team_code;
    if (!team_code) {
      return res.json({ team: null });
    }
    const team = await Team.findByPk(team_code);

    // members other than the leader
    const members = await User.findAll({
      where: { team_code: team_code, email: { [Op.ne]: team.leader_email } },
    });

    const leader = await User.findByPk(team.leader_email);

    res.json({ team, members, leader });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamDetailsByCode = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    const team_code = req.params.code;
    const team = await Team.findByPk(team_code);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ team });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user.team_code) {
      return res.json({ popup: "You are already part of a team" });
    }

    let { team_name } = req.body;

    team_name = team_name.trim();
    team_name = team_name.toUpperCase();

    const checkTeam = await Team.findOne({ where: { team_name: team_name } });

    if (checkTeam) {
      return res.json({ popup: "Team name already exists" });
    }

    const leader_email = req.user.email;
    let team_code =
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      Math.floor(1000 + Math.random() * 9000);

    while (true) {
      const team = await Team.findByPk(team_code);
      if (!team) {
        break;
      }
      team_code =
        Math.random().toString(36).substring(2, 6).toUpperCase() +
        Math.floor(1000 + Math.random() * 9000);
    }

    team_code = team_code.toUpperCase();

    const team = await Team.create({ team_code, team_name, leader_email });

    await User.update({ team_code }, { where: { email: leader_email } });

    res.json({
      message: `Team created with code: ${team_code}`,
      team,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const joinTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user.team_code) {
      return res.json({ popup: "You are already part of a team" });
    }

    const { code } = req.params;
    const user = await User.findByPk(req.user.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // if 4 members already in the team, do not allow joining
    const team = await Team.findByPk(code);
    if (!team) {
      return res.json({ popup: "Team not found! Check Code again" });
    }

    const teamMembers = await User.findAll({ where: { team_code: code } });

    if (teamMembers.length >= 4) {
      return res.json({ popup: "Team is full" });
    }

    await User.update({ team_code: code }, { where: { email: user.email } });

    res.json({ team, popup: "Joined team successfully" });
  } catch (error) {
    console.error("Error joining team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const leaveTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.user.team_code) {
      return res.json({ popup: "You are not part of a team" });
    }

    const user = await User.findByPk(req.user.email);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const team = await Team.findByPk(user.team_code);

    if (!team) {
      return res.json({ popup: "Team not found" });
    }

    await User.update({ team_code: null }, { where: { email: user.email } });

    if (team.leader_email === user.email) {
      const newLeader = await User.findOne({
        where: { team_code: user.team_code },
        order: [["createdAt", "ASC"]],
      });
      if (newLeader) {
        await Team.update(
          { leader_email: newLeader.email },
          { where: { team_code: user.team_code } }
        );
      } else {
        await Team.destroy({ where: { team_code: user.team_code } });
      }
    }
    res.json({ message: "Left team successfully" });
  } catch (error) {
    console.error("Error leaving team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const teamController = {
  getTeam,
  getTeamDetailsByCode,
  createTeam,
  joinTeam,
  leaveTeam,
};

module.exports = teamController;
