const Sequelize = require("sequelize");

const sequelizePool = require("../../util/database");
//? Foreign key field should never define during Modal creation.

const Cart = sequelizePool.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Cart;
