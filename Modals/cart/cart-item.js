const Sequelize = require("sequelize");

const sequelizePool = require("../../util/database");

const CartItem = sequelizePool.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNUll: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = CartItem;
