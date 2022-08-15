const { getCartTotal } = require("../../../util/helper");

const getCartController = (req, res) => {
  const { user } = req;

  const successCallback = (userWithPopulatedCart) => {
    const cartData = userWithPopulatedCart?.cart;
    return res.render("shop/cart", {
      docTitle: "Cart",
      docFooter: "Cart of your shop.",
      path: "/shop/cart",
      cartData,
      cartTotal: getCartTotal(cartData),
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  user.getCart(successCallback, failureCallback);
};

module.exports = getCartController;
