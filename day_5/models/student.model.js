const mongoose = require("mongoose");
const validator = require("validator");
const { courseSchema } = require("./course.model");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "must have a name"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "must have an email"],
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email.");
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  courses: {
    type: [courseSchema],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
  studentSchema,
};
