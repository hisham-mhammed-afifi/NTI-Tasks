const express = require("express");
const passport = require("passport");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
const tagController = require("../app/controllers/tag.controller");

router.post("/add", auth, tagController.addTag);
router.get("/showall", auth, tagController.showAll);
router.put("/update/:id", auth, tagController.updateTag);
router.delete("/delete", auth, tagController.deleteTag);

module.exports = router;
