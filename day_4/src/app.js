const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcom from app.js file.");
});

module.exports = app;
