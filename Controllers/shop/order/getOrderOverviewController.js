const getOrderOverviewController = (req, res, next) => {
  const { user } = req;
  const { orderId } = req.params;

  user
    .getOrders({
      where: {
        id: orderId,
      },
    })
    .then(([order]) => {
      return order.getProducts();
    })
    .then((orderProducts) => {
      return res.render("shop/order-overview", {
        docTitle: "Order Overview",
        docFooter: "Order Overview.",
        path: "/shop/order-overview",
        orderProducts,
        orderId,
        noNavigation: false,
      });
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

module.exports = getOrderOverviewController;
