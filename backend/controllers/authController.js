const ExpressError = require("../ExpressError");
const con = require("../models/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { emailSender } = require("../models/Email");
exports.registrationController = async (req, res, next) => {
  const user = req.body;
  const { email, password, firstName, lastName } = user;

  try {
    // Prepare the select statement
    const selectStmt = `SELECT email FROM users WHERE email = ? ;`;
    // Execute the select statement
    const [existingUser] = await con.promise().execute(selectStmt, [email]);

    if (existingUser.length) {
      return next(new ExpressError("User with this email already exists"));
    } else {
      // Prepare the insert statement
      const insertStmt = `INSERT INTO users (id,email, password, first_name, last_name) VALUES (?,?, ?, ?, ?);`;
      // Execute the insert statement
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const userId = uuidv4();
      await con
        .promise()
        .execute(insertStmt, [userId, email, hash, firstName, lastName]);
      emailSender(email, userId);
      res.send("User created");
    }
  } catch (e) {
    console.log(e);
    next(new ExpressError("Failed to register, please try again", 300));
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const selectStmt = `SELECT * FROM users WHERE email=? ;`;

    const [existingUser] = await con.promise().execute(selectStmt, [email]);

    if (!existingUser.length) {
      return next(new ExpressError("Incorrect password or email"));
    } else {
      const isMatch = await bcrypt.compare(password, existingUser[0].password);
      if (!isMatch) {
        return next(new ExpressError("Incorrect password or email"));
      }
      req.session.user = existingUser[0];
      console.log(req.session);
      res.send(req.session.user);
    }
  } catch (e) {
 
    next(new ExpressError("Something went wrong", 300));
  }
};

exports.emailVerificationController = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const selectStmt = `SELECT * FROM users WHERE id=?`;
    const [userToVerify] = await con.promise().execute(selectStmt, [userId]);
    if (userToVerify.length) {
      const updtStmt = "UPDATE users SET email_verified=1 WHERE id=?;";
      await con.promise().execute(updtStmt, [userId]);
      const [updatedUser] = await con
        .promise()
        .execute("SELECT * FROM users WHERE id = ?", [userId]);
      req.session.user = updatedUser[0];
      res.send("You are verified");
    }
  } catch (e) {
    next(new ExpressError("Something went wrong"));
  }
};
