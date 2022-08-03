const Order = require("../../../Modals/Order");
const Product = require("../../../Modals/product");
const { objectIdToStringId } = require("../../../util/helper");

const getOrderOverviewController = (req, res, next) => {
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

  const orderProductsMaker = (orderProductsIntermediate) => {
    const finalOrderProducts = orderProductsIntermediate.map((opInter) => {
      const matchedTempOrderProduct = tempOrderProducts.find(
        (tempOp) =>
          objectIdToStringId(tempOp?._id) === objectIdToStringId(opInter?._id)
      );

      return {
        ...opInter,
        quantity: matchedTempOrderProduct?.quantity,
      };
    });

    successCallback(finalOrderProducts);
  };

  const orderProductsRetriever = ({ products: orderProducts }) => {
    tempOrderProducts = [...orderProducts];

    const tempOrderProductsIdArray = tempOrderProducts.map(
      (rawProduct) => rawProduct._id
    );

    Product.findById(
      tempOrderProductsIdArray,
      orderProductsMaker,
      failureCallback
    );
  };

  const failureCallback = (error) => {
    console.log("The Error is : ", error);
  };

  let tempOrderProducts = [];

  Order.findById(orderId, orderProductsRetriever, failureCallback);
};

module.exports = getOrderOverviewController;
