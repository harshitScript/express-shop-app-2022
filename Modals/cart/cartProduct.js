const Sequelize = require("sequelize");

const sequelizePool = require("../../util/database");

const CartProduct = sequelizePool.define("cartProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = CartProduct;
