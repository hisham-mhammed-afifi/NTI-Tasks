const courseRoutes = require("../routes/courses.routes");
const studentRoutes = require("../routes/students.routes");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
require("../db/connection");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../frontend/views"));

app.use(express.static(path.join(__dirname, "../public")));

hbs.registerPartials(path.join(__dirname, "../frontend/layouts"));
app.use(express.json());
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

module.exports = app;
