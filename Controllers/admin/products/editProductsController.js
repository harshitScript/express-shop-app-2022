const Product = require("../../../Modals/product");

const editProductsController = (req, res) => {
  const { id } = req.params;
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(title, imageUrl, price, description);

  product.edit(id, () => {
    return res.redirect("/admin/products");
  });
};

module.exports = editProductsController;
