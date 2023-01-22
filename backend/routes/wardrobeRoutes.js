const router = require("express").Router();
const {
  getAllClothes,
  addNewPiece,
} = require("../controllers/wardrobeController");
router.get("/", getAllClothes);
router.post("/add", addNewPiece);

module.exports = router;
