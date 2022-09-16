const { objectIdToStringId } = require("../../../util/helper");

const getOrderOverviewController = (req, res, next) => {
  const { user } = req;
  const { orderId } = req.params;

  const successCallback = (orderProducts) => {
    return res.render("shop/order-overview", {
      docTitle: "Order Overview",
      docFooter: "Order Overview.",
      path: "/shop/order-overview",
      orderProducts,
      orderId,
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  const userWithPopulatedOrderIdsHandler = (userWithPopulatedOrderIds = {}) => {
    return userWithPopulatedOrderIds.populate(
      "orderIds.products.product_id",
      "-description -imageURL"
    );
  };

  const userWithPopulatedOrderProductsHandler = (
    userWithPopulatedOrderProducts = {}
  ) => {
    return userWithPopulatedOrderProducts?.orderIds.find(
      ({ _id }) => objectIdToStringId(_id) === objectIdToStringId(orderId)
    ).products;
  };

  user
    .populate("orderIds")
    .then(userWithPopulatedOrderIdsHandler)
    .then(userWithPopulatedOrderProductsHandler)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = getOrderOverviewController;
