const getOrdersController = (req, res, next) => {
  const { user } = req;

  const successCallback = ({ orderIds: ordersData }) => {
    return res.render("shop/orders", {
      docTitle: "Orders",
      docFooter: "Your orders history.",
      path: "/shop/orders",
      ordersData,
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  user.populate("orderIds").then(successCallback).catch(failureCallback);
};

module.exports = getOrdersController;
