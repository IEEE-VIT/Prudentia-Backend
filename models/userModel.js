const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(200),
    primaryKey: false,
    unique: false,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING(50),
    primaryKey: false,
    unique: false,
    allowNull: true,
  },
  mobile_number: {
    type: DataTypes.STRING(15),
    primaryKey: false,
    unique: true,
    allowNull: true,
    defaultValue: null,
  },
  team_code: {
    type: DataTypes.STRING(50),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
  hostel: {
    type: DataTypes.STRING(50),
    primaryKey: false,
    unique: false,
    allowNull: true,
    defaultValue: null,
  },
});
module.exports = User;
