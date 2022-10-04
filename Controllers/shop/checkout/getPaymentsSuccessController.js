const Order = require("../../../Modals/Order");

const getPaymentsSuccessController = (req, res, next) => {
  const { user } = req;

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
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

  const order = new Order({
    userId: user?._id,
    products: user?.cart,
    paymentStatus: "success",
  });

  order
    .save()
    .then(orderIdsUpdateHandler)
    .then(clearCartHandler)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = getPaymentsSuccessController;
