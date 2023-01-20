const ExpressError = require("../ExpressError");

exports.isVerified = (req, res, next) => {
  if (req.session.user && req.session.user["email_verified"]) {
    next();
  } else {
    throw new ExpressError("Verify to see the content", 401);
  }
};
