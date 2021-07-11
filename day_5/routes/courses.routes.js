const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses.controller");

router.get("/", courseController.showAllCourses);
router.post("/addcourse", courseController.addNewCourse);
module.exports = router;
