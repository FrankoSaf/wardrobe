const ExpressError = require("../ExpressError");
const con = require("../models/db");

exports.createNewOutfit = async (req, res, next) => {
  try {
    const checkStmt =
      "SELECT combination_name FROM combination WHERE combination_name=? AND user_id=?";
    const [checkStatus] = await con
      .promise()
      .execute(checkStmt, [req.body.combinationName, req.session.user.id]);
    if (
      checkStatus.some(
        (item) =>
          item.combination_name.toLowerCase() ===
          req.body.combinationName.toLowerCase()
      )
    ) {
      return next(new ExpressError("You have outfit with the same name"));
    }
    const insertStmt =
      "INSERT INTO combination(combination_name,user_id)VALUES(?,?)";
    await con
      .promise()
      .execute(insertStmt, [req.body.combinationName, req.session.user.id]);
    res.send("New outfit created");
  } catch (e) {
    next(new ExpressError("Something went wrong", 300));
  }
};
exports.showAllOutfitsController = async (req, res, next) => {
  console.log(req.session.user.id);
  try {
    const selectStmt = "SELECT * FROM combination WHERE user_id=?";

    const [data] = await con
      .promise()
      .execute(selectStmt, [req.session.user.id]);
    console.log(data[0]);
    res.send("yahoo");
  } catch (e) {
    next(new ExpressError(300, "Something went wrong"));
  }
};

exports.deleteOutfitController = async (req, res, next) => {
  const { outfitId } = req.body;
  console.log(req.session.user.id);
  try {
    const deleteStmt = "DELETE FROM combination WHERE user_id=? AND id=?";
    const [data] = await con
      .promise()
      .execute(deleteStmt, [req.session.user.id, outfitId]);
    if (data.affectedRows === 0) {
      return next(new ExpressError("Unable to delete outfit", 300));
    }
    res.send("Outfit deleted");
  } catch (e) {
    next(new ExpressError("Unable to delete outfit, try again later", 300));
  }
};

exports.addOutfitToFavorite = async (req, res, next) => {
  try {
    const { outfitId, favorite } = req.body;
    const updtStmt =
      "UPDATE combination SET favorite=? WHERE id=? AND user_id=?";
    const [data] = await con
      .promise()
      .execute(updtStmt, [favorite, outfitId, req.session.user.id]);
    if (data.affectedRows === 0) {
      return next(new ExpressError("Something went wrong", 300));
    }
    res.send("Added outfit to favorites");
  } catch (e) {
    next(new ExpressError("Something went wrong", 300));
  }
};
