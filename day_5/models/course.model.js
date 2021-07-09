const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
    unique: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = {
  Course,
  courseSchema,
};
