const getCheckoutController = (req, res, next) => {
  return res.render("shop/checkout", {
    docTitle: "Checkout",
    docFooter: "Checkout your Cart.",
    path: "/shop/checkout",
  });
};

module.exports = getCheckoutController;