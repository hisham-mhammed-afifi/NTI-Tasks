const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses.controller");

router.post("/addcourse", courseController.addCourse);
router.get("/students", courseController.showAllCourses);
module.exports = router;
