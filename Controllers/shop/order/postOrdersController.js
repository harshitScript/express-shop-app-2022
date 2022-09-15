const Order = require("../../../Modals/Order");

const postOrdersController = (req, res, next) => {
  const { user } = req;

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  const successCallback = () => {
    return res.redirect("/shop/orders");
  };

  const clearCartHandler = () => {
    return user.clearCart();
  };

  const orderIdsUpdateHandler = (newOrderResponse) => {
    return user.orderIdsUpdater(newOrderResponse);
  };

  const order = new Order({ userId: user?._id, products: user?.cart });

  order
    .save()
    .then(orderIdsUpdateHandler)
    .then(clearCartHandler)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = postOrdersController;
