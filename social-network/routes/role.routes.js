const express = require("express");
const router = new express.Router();
const Role = require("../database/models/role.model");

router.post("/add", async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(200).send(role);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).send(roles);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
