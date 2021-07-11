const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");

router.get("/", studentController.showAllStudents);
router.get("/:id", studentController.showOneStudent);
router.get("/:id/showallcourses", studentController.showCourses);
router.post("/addstudent/:courseId", studentController.addStudent);
router.delete("/:id", studentController.deleteStudent);
router.patch("/:id", studentController.editStudent);
router.put("/:id/addcourse/:courseId", studentController.addCourses);
router.put("/:id/removecourse/:courseId", studentController.removeCourses);

module.exports = router;
