const Product = require("../../../Modals/product");

const postProductsController = (req, res) => {
  const { title, price, description, imageURL } = req.body;

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    console.log(error.message);
    return res.redirect("/");
  };

  const product = new Product({ title, price, description, imageURL });

  product.save().then(successCallback).catch(failureCallback);
};

module.exports = { middleWare: postProductsController };
