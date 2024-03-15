const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Team = require("./TeamModel.js");

const User = sequelize.define("User", {
  email_id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  profile_pic: {
    type: DataTypes.STRING(200),
    primaryKey: false,
    unique: false,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING(50),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  team_code: {
    type: DataTypes.STRING(50),
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
});
module.exports = User;
