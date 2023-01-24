const ExpressError = require("../ExpressError");
const con = require("../models/db");
const { v4: uuidv4 } = require("uuid");
const { invitationSender } = require("../models/Email");
exports.createNewGroup = async (req, res, next) => {
  try {
    const insertStmt =
      "INSERT INTO collective(group_name,group_code,created_by) VALUES(?,?,?)";
    const selectStmt = "SELECT id FROM collective WHERE group_code=?";
    const insertStmt2 =
      "INSERT INTO user_collectives(user_id,group_id) VALUES(?,?)";
    const groupId = uuidv4();
    await con
      .promise()
      .execute(insertStmt, [req.body.groupName, groupId, req.session.user.id]);
    const [data] = await con.promise().execute(selectStmt, [groupId]);

    await con.promise().execute(insertStmt2, [req.session.user.id, data[0].id]);

    res.send("Group created");
  } catch (err) {
    next(new ExpressError("Creating group failed", 300));
  }
};
exports.deleteGroup = async (req, res, next) => {
  try {
    const deleteStmt =
      "DELETE FROM collective WHERE  group_code=? AND created_by =?";
    const [data] = await con
      .promise()
      .execute(deleteStmt, [req.body.groupCode, req.session.user.id]);
    if (data.affectedRows === 0) {
      return next(new ExpressError("Couldn't find a group by that ID", 400));
    }
    res.send("Group deleted");
  } catch (err) {
    next(new ExpressError("Deleting group failed"));
  }
};
exports.changeGroupName = async (req, res, next) => {
  try {
    const { groupName, groupCode } = req.body;
    console.log(groupName, groupCode);
    const updtStmt =
      "UPDATE collective SET group_name=? WHERE group_code=? AND created_by=?";
    const [data] = await con
      .promise()
      .execute(updtStmt, [groupName, groupCode, req.session.user.id]);
    if (data.affectedRows === 0) {
      return next(
        new ExpressError("Failed to update group name, try again", 400)
      );
    } else {
      res.send("Name of the group updated");
    }
  } catch (err) {
    next(new ExpressError());
  }
};

exports.sendGroupInvite = async (req, res, next) => {
  try {
    const selectStmt = "SELECT first_name FROM users WHERE email=?";
    const [data] = await con.promise().execute(selectStmt, [req.body.email]);

    invitationSender(
      req.body.email,
      req.session.user.first_name,
      req.body.groupCode,
      data[0].first_name
    );
    res.send("Invitation sent");
  } catch (err) {
    next(new ExpressError());
  }
};
