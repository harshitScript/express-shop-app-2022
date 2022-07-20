const postOrdersController = (req, res, next) => {
  const { user } = req;

  let fetchedCart = {};
  const cartProductsGenerator = (cart) => {
    fetchedCart = cart;
    return cart.getProducts();
  };

  const orderCreator = (cartProducts) => {
    console.log("The cartProducts:", cartProducts);
    return user.createOrder().then((order) => {
      order.addProducts(
        cartProducts?.map((product) => {
          product.orderProduct = { quantity: product.cartProduct.quantity };
          return product;
        })
      );
    });
  };

  /* const cartGenerator = () => {
    return user.getCart();
  };

  const cartCleaner = (cart) => {
    cart.removeProducts(tempCartProducts);
  }; */

  const successCallback = () => {
    //* will remove all the relation from the cart
    fetchedCart.setProducts(null);

    return res.redirect("/shop/orders");
  };

  const failureCallback = (error) => {
    console.log("Error:", error.message);
  };

  user
    .getCart()
    .then(cartProductsGenerator)
    .then(orderCreator)
    /*  .then(orderProductsCreator) */
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = postOrdersController;
