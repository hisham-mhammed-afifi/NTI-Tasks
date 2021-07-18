const express = require("express");
const passport = require("passport");
const userController = require("../app/controllers/user.controller");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
require("../app/middleware/passport")(passport);

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.post("/logoutAll", auth, userController.logoutAll);
router.post("/me", auth, userController.me);

router.post("/profile", auth, function (req, res) {
  res.send(req.user.email);
});

module.exports = router;
