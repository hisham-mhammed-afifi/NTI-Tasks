const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
  },
  image: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = {
  Course,
  courseSchema,
};
