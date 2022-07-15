const Sequelize = require("sequelize");
const sequelizePool = require("../util/database");

//? Foreign key field should never define during Modal creation.

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
