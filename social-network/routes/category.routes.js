const express = require("express");
const passport = require("passport");
const router = new express.Router();
const authorize = require("../app/middleware/auth");
const auth = passport.authenticate("jwt", { session: false });
const categoryController = require("../app/controllers/category.controller");

router.post("/add", [auth, authorize], categoryController.addCategory);
router.delete("/delete", [auth, authorize], categoryController.deleteCategory);

module.exports = router;
