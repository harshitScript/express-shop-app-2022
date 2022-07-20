const deleteCartProductController = (req, res) => {
  const { product_id } = req.body;
  const { user } = req;

  user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: product_id } });
    })
    .then(([product]) => {
      //! product.destroy() will delete the product from the product table.

      return product.cartProduct.destroy(); //* This will delete the product-relation from the cartProduct table.
    })
    .then((deletedProduct) => {
      return res.redirect("/shop/cart");
    });
};

module.exports = deleteCartProductController;
