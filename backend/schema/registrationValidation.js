const { check } = require("express-validator");
const ExpressError = require("../ExpressError");

exports.userValidationSchema = [
  check("firstName")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be at least 2 characters long"),
  check("lastName")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be at least 2 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm your password")
    .custom((val, { req }) => {
      if (val === req.body.password) return true;
      else throw new ExpressError("Passwords do not match", 300);
    }),
];

exports.loginValidationSchema = [
  check("email").not().isEmpty().withMessage("This field is required"),
  check("password").not().isEmpty().withMessage("This field is required"),
];
