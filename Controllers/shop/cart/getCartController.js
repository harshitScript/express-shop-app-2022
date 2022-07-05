const Cart = require("../../../Modals/cart");

const getCartController = (req, res) => {
  Cart.fetchAll((cartData) => {
    Cart.getCartTotal((cartTotal) => {
      return res.render("shop/cart", {
        docTitle: "Cart",
        docFooter: "Cart of your shop.",
        path: "/shop/cart",
        cartData,
        cartTotal,
        noNavigation: false,
      });
    });
  });
};

module.exports = getCartController;
