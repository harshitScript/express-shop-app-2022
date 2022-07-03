const Cart = require("../../../Modals/cart");

const getCartController = (req, res, next) => {
  Cart.fetchAll((cartData) => {
    return res.render("shop/cart", {
      docTitle: "Cart",
      docFooter: "Cart of your shop.",
      path: "/shop/cart",
      cartData: cartData,
      noNavigation: false,
    });
  });
};

module.exports = getCartController;
