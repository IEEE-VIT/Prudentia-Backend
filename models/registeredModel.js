const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Registered = sequelize.define("Registered", {
  email_id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
});
module.exports = Registered;
