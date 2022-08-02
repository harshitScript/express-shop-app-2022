const User = require("../../../Modals/User");

const deleteCartProductController = (req, res) => {
  const { product_id } = req.body;
  const { user } = req;

  const successCallback = () => {
    return res.redirect("/shop/cart");
  };

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  User.removeProductFromCart(
    user?._id,
    product_id,
    successCallback,
    failureCallback
  );
};

module.exports = deleteCartProductController;
