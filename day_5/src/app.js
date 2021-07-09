const express = require("express");
const app = express();

require("../db/connection");

const studentRoutes = require("../routes/students.routes");
const courseRoutes = require("../routes/courses.routes");

app.use(express.json());
app.use(studentRoutes);
app.use(courseRoutes);

module.exports = app;
