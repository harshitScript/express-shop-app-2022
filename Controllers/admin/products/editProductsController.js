const Product = require("../../../Modals/product");

const editProductsController = (req, res) => {
  const { id } = req.params;
  const { title, price, imageUrl, description } = req.body;

  const successCallback = (product) => {
    product.title = title;
    product.price = price;
    product.imageURl = imageUrl;
    product.description = description;

    return product.save();
  };

  const failureCallback = (error) => {
    console.log(error.message);
  };

  const productUpdatedCallback = () => {
    return res.redirect("/admin/products");
  };

  Product.findByPk(id)
    .then(successCallback)
    .then(productUpdatedCallback)
    .catch(failureCallback);
};

module.exports = editProductsController;
