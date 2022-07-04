const Product = require("../../../Modals/product");

const deleteProductController = (req, res) => {
  const { id } = req.query;

  return Product.delete(id, () => {
    return res.redirect("/admin/products");
  });
};

module.exports = deleteProductController;
