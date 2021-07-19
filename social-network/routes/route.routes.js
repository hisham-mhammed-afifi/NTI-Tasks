const express = require("express");
const router = new express.Router();
const Route = require("../database/models/route.model");

router.post("/add", async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(200).send(route);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.get("/all", async (req, res) => {
  try {
    const data = await Route.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post("/addrole/:id", async (req, res) => {
  try {
    _id = req.params.id;
    role = req.body.role;
    const route = await Route.findById(_id);
    route.roles = route.roles.concat(role);
    await route.save();
    res.status(200).send(route);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
