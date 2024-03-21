const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Registered = sequelize.define("Registered", {
  email: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
});
module.exports = Registered;
