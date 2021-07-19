const express = require("express");
const userController = require("../app/controllers/user.controller");
const upload = require("../app/middleware/multer-upload");
const passport = require("passport");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
require("../app/middleware/passport")(passport);

router.post("/signup", userController.signup);
router.get("/activate/:otp", userController.activateUser);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.post("/logoutall", auth, userController.logoutAll);
router.post("/showall", auth, userController.showAll);
router.post("/me", auth, userController.me);
router.post(
  "/profileimage",
  auth,
  upload.single("profile"),
  userController.profileImage
);

router.post("/profile", auth, function (req, res) {
  res.send(req.user.email);
});

module.exports = router;
