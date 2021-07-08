const express = require("express");
const hbs = require("hbs");
const path = require("path");
const myRoutes = require("../routes/myRoutes");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../frontend/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(myRoutes);

hbs.registerPartials(path.join(__dirname, "../frontend/layouts"));

module.exports = app;
