const Product = require("../../../Modals/product");

const postProductsController = (req, res, next) => {
  if (req.method === "POST") {
    const product = new Product(req?.body?.title);

    product.save();

    return res.redirect("/shop/");
  }
};

module.exports = { middleWare: postProductsController };
