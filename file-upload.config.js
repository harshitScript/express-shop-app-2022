const multer = require("multer");
const { acceptedMimeTypes } = require("./util/helper");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/product-images"),
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  if (acceptedMimeTypes[file.mimetype]) {
    return cb(null, true);
  }
  return cb(null, false);
};

const uploadProductImage = multer({
  storage: diskStorage,
  fileFilter,
  limits: { fileSize: 5000000 },
});

module.exports = {
  uploadProductImage,
};
