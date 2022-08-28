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
    console.log("Error:", error.message);
  };

  user.populate("orderIds").then(successCallback).catch(failureCallback);
};

module.exports = getOrdersController;
