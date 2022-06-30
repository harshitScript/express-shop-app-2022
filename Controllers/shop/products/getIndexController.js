const getIndexController = (req, res, next) => {
  return res.render("shop/index", {
    docTitle: "Home",
    docFooter: "Home page of your shop.",
    path: "shop/home",
  });
};

module.exports = getIndexController;
