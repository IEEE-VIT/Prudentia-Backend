const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const User = require("./userModel.js");

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
  },
  r0_ppt_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  r2_github_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  r3_ppt_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  score: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  suggestion: {
    type: DataTypes.TEXT,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  r3_order: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
  group_id: {
    type: DataTypes.STRING(100),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  },
});
module.exports = Team;
