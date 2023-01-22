const router = require("express").Router();
const {
  getAllClothes,
  addNewPiece,
} = require("../controllers/wardrobeController");
const { clothesValidation } = require("../schema/clothesValidation");
const { schemaValidation } = require("../schema/schemaValidation");
router.get("/", getAllClothes);
router.post("/add", clothesValidation, schemaValidation, addNewPiece);

module.exports = router;
