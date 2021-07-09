const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");

router.post("/addstudent", studentController.addStudent);
router.get("/students", studentController.showAllStudents);
router.get("/students/:id", studentController.showOneStudent);
router.delete("/students/:id", studentController.deleteStudent);
router.patch("/students/:id", studentController.editStudent);
module.exports = router;
