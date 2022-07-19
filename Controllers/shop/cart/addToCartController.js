const Product = require("../../../Modals/product");

const addToCartController = (req, res, next) => {
  const { product_id } = req.body;

  const { user } = req;

  let tempCart = {};

  const productsGenerator = (cart) => {
    tempCart = cart;

    return cart.getProducts({ where: { id: product_id } });
  };

  const productAdder = ([productInCart]) => {
    if (productInCart) {
      return tempCart.addProduct(productInCart, {
        through: {
          quantity: productInCart.cartProduct.quantity + 1,
        },
      });
    } else {
      return tempCart.addProduct(product_id, {
        through: {
          quantity: 1,
        },
      });
    }
  };

  const successCallback = (product) => {
    return res.redirect("/shop/cart");
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error.message);
  };

  user
    .getCart()
    .then(productsGenerator)
    .then(productAdder)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = addToCartController;
