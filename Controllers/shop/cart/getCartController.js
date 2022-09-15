const { getCartTotal } = require("../../../util/helper");

const getCartController = (req, res, next) => {
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

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  user.getCart(successCallback, failureCallback);
};

module.exports = getCartController;
