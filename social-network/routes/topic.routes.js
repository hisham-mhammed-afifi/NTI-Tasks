const express = require("express");
const passport = require("passport");
const authorize = require("../app/middleware/auth");
const router = new express.Router();
const auth = passport.authenticate("jwt", { session: false });
const topicController = require("../app/controllers/topic.controller");

router.post("/add", [auth, authorize], topicController.addTopic);
router.get("/showall", auth, topicController.showAll);
router.get("/show/:id", auth, topicController.showTopic);
router.put("/update/:id", [auth, authorize], topicController.updateTopic);
router.delete("/delete", [auth, authorize], topicController.deleteTopic);

module.exports = router;
