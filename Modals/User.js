const Sequelize = require("sequelize");
const sequelizePool = require("../util/database");

const User = sequelizePool.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNUll: false,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
