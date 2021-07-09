const studentModel = require("../models/student.model");
addStudent = async (req, res) => {
  try {
    const studentData = new studentModel(req.body);
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
    const data = await studentModel.find();
    res.status(200).send({
      apiStatus: true,
      message: "Here is all studens.",
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
showOneStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentModel.findById(id);
    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "Student NOT found.",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
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
deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentModel.findByIdAndDelete(id);
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
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!student) res.send("NOT found");
    res.send("Updated successfully.");
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
};
