const Product = require("../../../Modals/product");

const postProductsController = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(title, imageUrl, price, description);

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    console.log(error.message);
    return res.redirect("/");
  };

  product.save(successCallback, failureCallback);
};

module.exports = { middleWare: postProductsController };
