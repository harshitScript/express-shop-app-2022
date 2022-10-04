const { getCartTotal } = require("../../../util/helper");
const stripe = require("stripe");
const stripeSession = stripe(
  "sk_test_51Los4cSGvdYvFcADrbGZm6DPmub6gQgrQJCc0NrQv8gFmQEHyz7kZEw0OsN9Iac4nMDP5YbbqHlG1X8q16GW5yjc00FLFuBqQh"
);

const getCheckoutController = (req, res, next) => {
  const { user } = req;

  const successCallback = (checkoutProducts) => {
    return res.render("shop/checkout.ejs", {
      docTitle: "Checkout your cart.",
      docFooter: "Have fun with your new order",
      path: "/shop/checkout",
      noNavigation: false,
      checkoutProducts,
      csrfToken: req.csrfToken(),
      totalAmount: getCartTotal(checkoutProducts),
    });
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  user.getCart().then(successCallback).catch(failureCallback);
};
module.exports = getCheckoutController;
