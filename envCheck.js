const fs = require("fs/promises");
const path = require("path");
const rootDirPath = require("./util/path");

const checkEnv = () => {
  return fs.readFile(path.join(rootDirPath, ".env"));
};

module.exports = checkEnv;
