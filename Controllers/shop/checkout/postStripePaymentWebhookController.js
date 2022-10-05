const postStripePaymentWebhookController = (req, res, next) => {
  const event = request.body;

  let paymentIntent;
  let paymentMethod;

  switch (event.type) {
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      paymentMethod = event.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.status(204).end();
};
module.exports = postStripePaymentWebhookController;
