const { validationResult } = require("express-validator");
const ExpressError = require("../ExpressError");
const schemaValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (result.length !== 0) {
    throw new ExpressError(result, 300);
  } else {
    next();
  }
};

module.exports = { schemaValidation };
