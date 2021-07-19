require("dotenv").config();
require("../database/connection");

const cors = require("cors");
const express = require("express");
const passport = require("passport");
const userRoutes = require("../routes/user.routes");
const roleRoutes = require("../routes/role.routes");
const routeRoutes = require("../routes/route.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/routes", routeRoutes);

module.exports = app;
