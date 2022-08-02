const { ObjectId } = require("mongodb");

const getCartTotal = (cartData = []) => {
  return cartData.reduce((acc, curr) => {
    return (acc += +curr.price * +curr?.cartProduct?.quantity);
  }, 0);
};

const objectIdToStringId = (ObjId) => {
  return ObjId.toString();
};

const stringIdToObjectId = (strId = "") => {
  return new ObjectId(strId);
};

module.exports = {
  getCartTotal,
  objectIdToStringId,
  stringIdToObjectId,
};
