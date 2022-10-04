const { getCartTotal } = require("../../../util/helper");

const getCartController = (req, res, next) => {
  const { user } = req;

  const successCallback = (cartData) => {
    return res.render("shop/cart", {
      docTitle: "Cart",
      docFooter: "Cart of your shop.",
      path: "/shop/cart",
      cartData,
      csrfToken: req.csrfToken(),
      cartTotal: getCartTotal(cartData),
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  user.getCart().then(successCallback).catch(failureCallback);
};

module.exports = getCartController;
