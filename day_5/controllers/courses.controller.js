const courseModel = require("../models/course.model");
addCourse = async (req, res) => {
  try {
    const courseData = new courseModel(req.body);
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
    const data = await courseModel.find();
    res.status(200).send({
      apiStatus: true,
      message: "Here is all Courses.",
      data: data,
      count: data.length,
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
  addCourse,
  showAllCourses,
};
