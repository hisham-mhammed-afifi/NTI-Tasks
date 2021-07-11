const { Course } = require("../models/course.model");
const { Student } = require("../models/student.model");

addStudent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const students = await Student.find();
    const course = await Course.findById(courseId);
    const studentData = new Student({
      studentId: students.length + 1,
      ...req.body,
      courses: [course],
    });

    await studentData.save();
    res.status(200).send({
      apiStatus: true,
      message: "Student added successfully.",
      data: studentData,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error inserting data",
      data: e,
    });
  }
};
showAllStudents = async (req, res) => {
  try {
    const data = await Student.find();
    res.status(200).render("showAllStudents", {
      data,
      localhost: req.hostname,
      port: process.env.PORT,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
showOneStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.findById(id);
    if (!data) {
      res.status(200).render("notFound");
    }
    res.status(200).render("showOneStudent", {
      data,
      localhost: req.hostname,
      port: process.env.PORT,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.findByIdAndDelete(id);
    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "Student NOT found",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "Student deleted successfully.",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
editStudent = async (req, res) => {
  const allowedUpdates = ["name", "password"];
  const newData = Object.keys(req.body);
  isValid = newData.every((update) => allowedUpdates.includes(update));
  if (!isValid) res.status(500).send("NOT avaliable");
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!student) res.send("NOT found");
    res.send("Updated successfully.");
  } catch (e) {
    res.send(e);
  }
};
showCourses = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.findById(id);
    const courses = await data.courses;
    if (!courses) {
      res.status(404).send({
        apiStatus: true,
        message: "There are NO courses yet.",
        data: courses,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: courses,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
addCourses = async (req, res) => {
  const allowedUpdates = ["courses"];
  const newData = Object.keys(req.body);
  isValid = newData.every((update) => allowedUpdates.includes(update));
  if (!isValid) res.status(500).send("NOT avaliable");
  try {
    const data = await Student.findById(req.params.id);
    const courses = await data.courses;
    const course = await Course.findById(req.params.courseId);
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { courses: [...courses, course] },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!student) res.send("NOT found");
    res.send(student);
  } catch (e) {
    res.send(e);
  }
};
removeCourses = async (req, res) => {
  const allowedUpdates = ["courses"];
  const newData = Object.keys(req.body);
  isValid = newData.every((update) => allowedUpdates.includes(update));
  if (!isValid) res.status(500).send("NOT avaliable");
  try {
    const data = await Student.findById(req.params.id);
    const courses = await data.courses;
    const removeIndex = await courses.findIndex(
      (course) => course._id == req.params.courseId
    );
    courses.splice(removeIndex, 1);
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { courses: courses },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!student) res.send("NOT found");
    res.send(student);
  } catch (e) {
    res.send(e);
  }
};
module.exports = {
  addStudent,
  showAllStudents,
  showOneStudent,
  deleteStudent,
  editStudent,
  showCourses,
  addCourses,
  removeCourses,
};
