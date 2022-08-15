const deleteCartProductController = (req, res) => {
  const { product_id } = req.body;
  const { user } = req;

  const successCallback = () => {
    return res.redirect("/shop/cart");
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  user.removeFromCart(product_id).then(successCallback).catch(failureCallback);
};

module.exports = deleteCartProductController;
