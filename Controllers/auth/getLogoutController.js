const getLogoutController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log("Error occurred while destroying the session.");
    return res.redirect("/");
  });
};

module.exports = getLogoutController;
