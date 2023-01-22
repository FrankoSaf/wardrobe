const ExpressError = require("../ExpressError");
const { isVerified } = require("../middlewares/userVerified");
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
    await con
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

exports.filterClothes = async (req, res) => {
  try {
    let filterStmt = `SELECT * FROM clothes WHERE user_id =? `;
    const params = [];
    if (req.body.name) {
      filterStmt += ` AND name LIKE '%${req.body.name}%'`
  
    }
    if (req.body.type.length > 0) {
      const types = req.body.type;
      filterStmt += "AND type IN(";
      types.forEach((type, index) => {
        filterStmt += "?";
        if (index < types.length - 1) {
          filterStmt += ",";
        }
        params.push(type);
      });
      filterStmt += ")";
    }

    if (req.body.color.length > 0) {
      const colors = req.body.color;
      filterStmt += "AND color IN(";
      colors.forEach((color, index) => {
        filterStmt += "?";
        if (index < colors.length - 1) {
          filterStmt += ",";
        }
        params.push(color);
      });
      filterStmt += ")";
    }
    if (req.body.isClean || req.body.isClean === 0) {
      filterStmt += ` AND is_clean=?`;

      params.push(req.body.isClean);
    }
    console.log(params);
    const filteredThings = await con
      .promise()
      .execute(filterStmt, [req.body.user_id, ...params]);
    console.log([req.body.user_id, ...params]);
    res.json(filteredThings[0]);
  } catch (e) {
    res.send(e);
  }
};
