const deleteCartProductController = (req, res, next) => {
  const { product_id } = req.body;
  const { user } = req;

  const successCallback = () => {
    return res.redirect("/shop/cart");
  };

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  user.removeFromCart(product_id).then(successCallback).catch(failureCallback);
};

module.exports = deleteCartProductController;
