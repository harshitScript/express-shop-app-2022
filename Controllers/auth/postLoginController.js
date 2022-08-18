const postLoginController = (req, res) => {
  const { email, password } = req.body;

  return res.redirect("/shop/");
};

module.exports = postLoginController;
