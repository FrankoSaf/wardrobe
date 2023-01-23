const {
  createNewOutfit,
  showAllOutfitsController,
  deleteOutfitController,
  addOutfitToFavorite,
} = require("../controllers/outfitController");
const { addPieceToCollections } = require("../controllers/wardrobeController");

const router = require("express").Router();

router.post("/create", createNewOutfit);
router.get("/showAll", showAllOutfitsController);
router.post("/addToOutfit", addPieceToCollections);
router.delete("/deleteOutfit", deleteOutfitController);
router.put("/addFavorite", addOutfitToFavorite);
module.exports = router;
