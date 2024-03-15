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
    defaultValue: null,
  },
  r2_github_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  r3_ppt_link: {
    type: DataTypes.STRING(300),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  score: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  suggestion: {
    type: DataTypes.TEXT,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  r3_order: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  group_id: {
    type: DataTypes.STRING(100),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
});
module.exports = Team;
