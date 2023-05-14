const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const middlewareController = require("../controllers/middlewareController");

router.post("/", testController.createTest);

module.exports = router;
