const stripe = require("stripe");
const stripeSession = stripe(process.env.STRIPE_KEY);

const getPaymentsPageController = (req, res, next) => {
  const { user } = req;

  const failureCallback = (error) => {
    return res.status(500).json({ error });
  };

  const successCallback = (checkoutProducts) => {
    return stripeSession.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: checkoutProducts.map((product) => ({
        price_data: {
          currency: "INR",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
            description: product.description,
          },
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/shop/payment-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/shop/payment-cancel`,
    });
  };

  user
    .getCart()
    .then(successCallback)
    .then((stripeSession) => res.redirect(303, stripeSession.url))
    .catch(failureCallback);
};

module.exports = getPaymentsPageController;
