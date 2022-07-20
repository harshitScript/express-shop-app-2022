const Sequelize = require("sequelize");

const sequelizePool = require("../../util/database");

const OrderProduct = sequelizePool.define("orderProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderProduct;
