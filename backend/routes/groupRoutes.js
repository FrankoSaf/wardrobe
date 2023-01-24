const { createNewGroup, deleteGroup, changeGroupName, sendGroupInvite } = require("../controllers/groupController");

const router = require("express").Router();

router.post("/create", createNewGroup);
router.delete("/deleteGroup", deleteGroup);
router.put("/updateGroup", changeGroupName);
router.post('/sendInvite',sendGroupInvite)
module.exports = router;
