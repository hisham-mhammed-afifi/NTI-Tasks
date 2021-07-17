const express = require("express");
const router = new express.Router();

router.get("/test", async (req, res) => {
  try {
    res.status(200).send("Hello from user routes");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
