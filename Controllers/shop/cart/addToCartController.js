const Cart = require("../../../Modals/cart");

const addToCartController = (req, res, next) => {
  const { product_id } = req.body;

  const cartProduct = new Cart(product_id);

  cartProduct.save(() => {
    return res.redirect("/shop/cart");
  });
};

module.exports = addToCartController;
