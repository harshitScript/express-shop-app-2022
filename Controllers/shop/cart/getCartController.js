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
      isAuthenticated: req.isAuthenticated,
    });
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  user.getCart(successCallback, failureCallback);
};

module.exports = getCartController;
