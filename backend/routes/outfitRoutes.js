const {
  createNewCombination,
  showAllOutfitsController,
} = require("../controllers/outfitController");
const { addPieceToCollections } = require("../controllers/wardrobeController");

const router = require("express").Router();

router.post("/create", createNewCombination);
router.get("/showAll", showAllOutfitsController);
router.post("/addToOutfit", addPieceToCollections);

module.exports = router;
