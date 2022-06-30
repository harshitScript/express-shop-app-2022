const getCartController = (req, res, next) => {
  return res.render("shop/cart", {
    docTitle: "Cart",
    docFooter: "Cart of your shop.",
    path: "/shop/cart",
  });
};

module.exports = getCartController;
