const errorController = (req, res) => {
  return res.status(404).render("shop/error-page", {
    docTitle: "Page Not Found",
    docFooter: "Are you lost baby girl.",
    path: "none",
    noNavigation: false,
  });
};

module.exports = errorController;
