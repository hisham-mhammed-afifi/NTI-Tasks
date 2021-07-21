const express = require("express");
const passport = require("passport");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
const commentController = require("../app/controllers/comment.controller");

router.post("/add", auth, commentController.addComment);
router.put("/update/:id", auth, commentController.updateComment);
router.delete("/delete", auth, commentController.deleteComment);

module.exports = router;
