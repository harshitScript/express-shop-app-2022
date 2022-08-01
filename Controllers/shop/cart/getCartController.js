const { getCartTotal } = require("../../../util/helper");

const User = require("../../../Modals/User");

const getCartController = (req, res) => {
  const { user } = req;

  const successCallback = ({ cart: cartData }) => {
    return res.render("shop/cart", {
      docTitle: "Cart",
      docFooter: "Cart of your shop.",
      path: "/shop/cart",
      cartData,
      cartTotal: getCartTotal(cartData),
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  User.findById(user?._id, successCallback, failureCallback);
};

module.exports = getCartController;
