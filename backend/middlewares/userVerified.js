const ExpressError = require("../ExpressError");
const con = require("../models/db");
exports.isVerified = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return next(new ExpressError("Please login or Register", 300));
    }
    const checkStmt =
      "SELECT id,email,email_verified,first_name,last_name FROM users WHERE email=? ;";
    const [userCheck] = await con
      .promise()
      .execute(checkStmt, [req.session.user.email]);
    req.session.user = userCheck[0];
    if (req.session.user["email_verified"]) {
      next();
    } else {
      res.redirect("/auth/verify");
    }
  } catch (err) {
    throw new ExpressError("Something went wrong", 500);
  }
};
