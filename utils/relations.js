const user = require("../models/userModel");
const team = require("../models/TeamModel");
const registered = require("../models/registeredModel");
const Deadline = require("../models/deadlinesModel");
const sequelize = require("./index");

const relations = () => {
  team.hasMany(user, { foreignKey: "team_code" });
  user.belongsTo(team, { foreignKey: "team_code" });
  team.belongsTo(user, { foreignKey: "leader_email" });
  user.hasOne(team, { foreignKey: "leader_email" });
  return sequelize;
};

module.exports = relations;
