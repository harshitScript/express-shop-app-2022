const expressErrorController = (error, req, res, next) => {
  if (error.httpStatusCode === 500) {
    //* WE RETURN DIFFERENT ERROR RESPONSE BASED ON THIS META INFORMATION.
    return res.status(500).redirect("/server-error");
  }
  return res.status(500).redirect("/server-error");
};

module.exports = expressErrorController;

//? Conditions to trigger.
//* To trigger it from inside the then catch or try catch or async code we have to use next(error).
//* In case of synchronous code just throwing error will trigger that middleware.
