const Product = require("../../../Modals/product");

const editProductsController = (req, res) => {
  const { id } = req.params;
  const { title, price, imageUrl, description } = req.body;

  const updateProduct = {
    _id: id,
    title,
    price,
    imageUrl,
    description,
  };

  const failureCallback = (error) => {
    console.log("The error is : ", error.message);
  };

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  Product.update(updateProduct, successCallback, failureCallback);
};

module.exports = editProductsController;
