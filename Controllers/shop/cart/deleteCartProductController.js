const Cart = require("../../../Modals/cart");

const deleteCartProductController = (req, res) => {
  const { product_id } = req.body;

  Cart.delete(product_id, () => {
    return res.redirect("/shop/cart");
  });
};

module.exports = deleteCartProductController;
