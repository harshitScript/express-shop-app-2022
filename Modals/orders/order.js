const Sequelize = require("sequelize");

const sequelizePool = require("../../util/database");
//? Foreign key field should never define during Modal creation.

const Order = sequelizePool.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Order;
