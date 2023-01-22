const router = require("express").Router();
const {
  getAllClothes,
  addNewPiece,
  filterClothes,
  addToBasket,
  cleanStatusController,
  deleteClothController,
  updatedClothController,
} = require("../controllers/wardrobeController");
const { clothesValidation } = require("../schema/clothesValidation");
const { schemaValidation } = require("../schema/schemaValidation");
router.get("/", getAllClothes);
router.post("/add", clothesValidation, schemaValidation, addNewPiece);
router.post("/clothes/filter", filterClothes);
router.put("/clothes/cleanstatus", cleanStatusController);
router.delete("/clothes/delete", deleteClothController);
router.put('/clothes/update',updatedClothController)
module.exports = router;
