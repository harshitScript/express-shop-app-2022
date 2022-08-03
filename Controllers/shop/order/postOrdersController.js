const User = require("../../../Modals/User");
const Order = require("../../../Modals/Order");

const postOrdersController = (req, res, next) => {
  const { user } = req;

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  const successCallback = () => {
    return res.redirect("/shop/orders");
  };

  const clearCartAfterSavingOrder = () => {
    User.clearCart(user?._id, successCallback, failureCallback);
  };

  const updateCart = ({ insertedId }) => {
    User.attachOrderId(
      user?._id,
      insertedId,
      clearCartAfterSavingOrder,
      failureCallback
    );
  };

  const saveOrder = (user_doc) => {
    const order = new Order(user_doc?._id, user_doc.cart);

    order.save(updateCart, failureCallback);
  };

  User.findById(user?._id, saveOrder, failureCallback);
};

module.exports = postOrdersController;
