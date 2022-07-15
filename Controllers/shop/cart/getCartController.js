const { getCartTotal } = require("../../../util/helper");

const getCartController = (req, res) => {
  const { user } = req;

  const successCallback = (cartData) => {
    return res.render("shop/cart", {
      docTitle: "Cart",
      docFooter: "Cart of your shop.",
      path: "/shop/cart",
      cartData,
      cartTotal: getCartTotal(cartData),
      noNavigation: false,
    });
  };

  user
    .getCart()
    .then((cart) => {
      return cart.getCartItems();
    })
    .then(successCallback)
    .catch((error) => {
      console.log("Error", error.message);
    });
};

module.exports = getCartController;
