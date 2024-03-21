const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Deadline = sequelize.define("Deadline", {
  round_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    primaryKey: false,
    unique: true,
    allowNull: false,
  },
});
module.exports = Deadline;
