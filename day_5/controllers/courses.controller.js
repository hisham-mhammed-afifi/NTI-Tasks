const { Course } = require("../models/course.model");

addNewCourse = async (req, res) => {
  try {
    const courseData = new Course(req.body);
    await courseData.save();
    res.status(200).send({
      apiStatus: true,
      message: "Course added successfully.",
      data: courseData,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error inserting data",
      data: e,
    });
  }
};
showAllCourses = async (req, res) => {
  try {
    const data = await Course.find();
    res.status(200).render("showAllCourses", {
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

module.exports = {
  addNewCourse,
  showAllCourses,
};
