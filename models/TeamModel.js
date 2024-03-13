const { DataTypes } = require("sequelize");
const sequelize = require("../index.js");

const Team = sequelize.define("Team", {
  team_code: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  team_name: {
    type: DataTypes.STRING(100),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  leader_email: {
    type: DataTypes.STRING(100),
    primaryKey: false,
    unique: true,
    allowNull: false,
    references: {
      model: "User",
      key: "email_id",
    },
  },
  r0_ppt_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  r2_github_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  r3_ppt_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: false,
    allowNull: true,
  },
  suggestion: {
    type: DataTypes.TEXT,
    primaryKey: false,
    unique: false,
    allowNull: false,
  },
  r3_order: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.STRING(100),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
});
module.exports = Team;
