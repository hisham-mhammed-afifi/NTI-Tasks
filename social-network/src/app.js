require("../database/connection");

const cors = require("cors");
const express = require("express");
const userRoutes = require("../routes/user.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);

module.exports = app;
