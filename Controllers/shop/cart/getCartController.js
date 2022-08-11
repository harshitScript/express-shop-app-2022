const { getCartTotal, objectIdToStringId } = require("../../../util/helper");
const User = require("../../../Modals/User");
const Product = require("../../../Modals/product");

const getCartController = (req, res) => {
  const { user } = req;
  let tempCart = [];

  const successCallback = (cartData = []) => {
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

  const cartMaker = (products) => {
    const cartData = products.map((product) => {
      return {
        ...product,
        price: +product?.price,
        quantity:
          tempCart?.find((item) => {
            return (
              objectIdToStringId(item?._id) === objectIdToStringId(product?._id)
            );
          })?.quantity || 0,
      };
    });

    return successCallback(cartData);
  };

  const cartProductsGenerator = ({ cart: rawCartData }) => {
    tempCart = [...rawCartData];

    const productIdInCartArray = rawCartData.map(({ _id }) => _id);

    return Product.findById(productIdInCartArray, cartMaker, failureCallback);
  };

  User.findById(user?._id, cartProductsGenerator, failureCallback);
};

module.exports = getCartController;
