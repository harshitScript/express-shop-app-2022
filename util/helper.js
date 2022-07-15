const getCartTotal = (cartData = []) => {
  return cartData.reduce((acc, curr) => {
    return (acc += +curr.totalPrice);
  }, 0);
};

module.exports = {
  getCartTotal,
};
