const ExpressError = require("../ExpressError");
const con = require("../models/db");

exports.createNewCombination = async (req, res, next) => {
  try {
    console.log(req.body.name, req.session.user.id);
    const insertStmt =
      "INSERT INTO combination(combination_name,user_id)VALUES(?,?)";
    await con
      .promise()
      .execute(insertStmt, [req.body.combinationName, req.session.user.id]);
    res.send("New outfit created");
  } catch (e) {
    next(new ExpressError( "Something went wrong",300));
  }
};
exports.showAllOutfitsController = async (req, res, next) => {
    console.log(req.session.user.id)
  try {
    const selectStmt = "SELECT * FROM combination WHERE user_id=?";
   
    const [data] = await con.promise().execute(selectStmt, [req.session.user.id]);
    console.log(data[0])
    res.send('yahoo');
  } catch (e) {
    next(new ExpressError(300, "Something went wrong"));
  }
};
