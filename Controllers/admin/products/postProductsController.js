const Product = require("../../../Modals/product");

const postProductsController = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(title, imageUrl, price, description);

  product.save(() => {
    return res.redirect("/shop/");
  });
};

module.exports = { middleWare: postProductsController };
