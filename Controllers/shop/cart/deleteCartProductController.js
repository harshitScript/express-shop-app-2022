const deleteCartProductController = (req, res, next) => {
  const { product_id } = req.body;
  const { user } = req;

  const successCallback = () => {
    return res.redirect("/shop/cart");
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  user.removeFromCart(product_id).then(successCallback).catch(failureCallback);
};

module.exports = deleteCartProductController;
