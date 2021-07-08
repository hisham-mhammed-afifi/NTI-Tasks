const express = require("express");
const router = new express.Router();
const myController = require("../controllers/myController");

router.get("/blog/:langId/0/11", myController.getAll);
router.get("/blog/:articalId/:langId", myController.getOne);
router.get("*", myController.notFound);

module.exports = router;
