const { check } = require("express-validator");

exports.clothesValidation = [
  check("name").isLength({ min: 1 }).withMessage("Name is required"),
  check("type")
    .isIn([
      "T-shirt",
      "Shirt",
      "Jeans",
      "Pants",
      "Dress",
      "Skirt",
      "Sweater",
      "Jacket",
      "Coat",
      "Underwear",
      "Socks",
      "Shoes",
      "Sandals",
      "Sneakers",
      "Boots",
      "Scarf",
      "Hat",
      "Gloves",
      "Belt",
      "Handbag",
    ])
    .withMessage("Invalid type"),
  check("color")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Color is required"),
  check("isClean")
    .optional()
    .isInt({ min: 0, max: 1 })
    .withMessage("Invalid value"),
];
