const expressErrorController = (error, req, res, next) => {
  return res.status(500).redirect("/server-error");
};

module.exports = expressErrorController;
