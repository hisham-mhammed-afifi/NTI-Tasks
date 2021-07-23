const express = require("express");
const passport = require("passport");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
const groupController = require("../app/controllers/group.controller");

router.post("/create", auth, groupController.addGroup);
router.post("/join", auth, groupController.joinGroup);
router.put("/update/:id", auth, groupController.updateGroup);
router.delete("/delete", auth, groupController.deleteGroup);

module.exports = router;
