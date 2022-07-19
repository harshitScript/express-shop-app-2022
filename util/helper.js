const getCartTotal = (cartData = []) => {
  return cartData.reduce((acc, curr) => {
    return (acc += +curr.price * +curr?.cartProduct?.quantity);
  }, 0);
};

module.exports = {
  getCartTotal,
};
