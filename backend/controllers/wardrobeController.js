const ExpressError = require("../ExpressError");
const con = require("../models/db");

exports.getAllClothes = async (req, res) => {
  try {
    const selectStmt = "SELECT * FROM clothes WHERE clothes.user_id=?;";
    const [clothes] = await con
      .promise()
      .execute(selectStmt, [req.session.user.id]);
    if (clothes.length > 0) {
      res.json({ clothes });
    } else {
      res.send("Your wardrobe is empty");
    }
  } catch (e) {
    res.send(e);
  }
};

exports.addNewPiece = async (req, res) => {
  try {
    const cloth = req.body;
    if (cloth.isClean > 0 && cloth.isClean != 1) {
      cloth.isClean = 1;
    }
    const insertStmt = `INSERT INTO clothes (user_id,name,type,color,image,is_clean)VALUES(?,?,?,?,?,?)`;
    const [newCloth] = await con
      .promise()
      .execute(insertStmt, [
        req.session.user.id,
        cloth.name,
        cloth.type,
        cloth.color,
        cloth.image || null,
        cloth.isClean || 1,
      ]);

    res.send("New piece added");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
