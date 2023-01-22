const ExpressError = require("../ExpressError");
const con = require("../models/db");
exports.isVerified = async (req, res, next) => {
  try {
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
    throw new ExpressError(500, "Something went wrong");
  }
};
