const { ObjectId } = require("mongodb");
const { createHmac, randomBytes } = require("crypto");

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

const generateHashedPassword = (algorithm = "sha256", password = "") => {
  const hashedPassword = createHmac(algorithm, process.env.SECRET)
    .update(password)
    .digest("hex");

  return hashedPassword;
};

const tokenGenerationPromise = new Promise((resolve, reject) => {
  randomBytes(32, (err, buffer) => {
    if (err) {
      reject(err);
    }

    const token = buffer.toString("hex");

    resolve(token);
  });
});

module.exports = {
  getCartTotal,
  objectIdToStringId,
  stringIdToObjectId,
  generateHashedPassword,
  tokenGenerationPromise,
};
