const express = require("express");
const passport = require("passport");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
const postController = require("../app/controllers/post.controller");

router.post("/add", auth, postController.addPost);
router.get("/showall", auth, postController.showAll);
router.get("/show/:id", auth, postController.showPost);
router.put("/update/:id", auth, postController.updatePost);
router.delete("/delete", auth, postController.deletePost);

module.exports = router;
