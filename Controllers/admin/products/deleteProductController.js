const Product = require("../../../Modals/product");

const deleteProductController = (req, res) => {
  const { id } = req.params;

  return Product.delete(id, () => {
    return res.redirect("/admin/products");
  });
};

module.exports = deleteProductController;
