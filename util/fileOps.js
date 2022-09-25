const fs = require("fs/promises");

const deleteFile = ({ filePath }) => {
  return fs.unlink(filePath);
};

module.exports = {
  deleteFile,
};
