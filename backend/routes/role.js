const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const middlewareController = require("../controllers/middlewareController");

router.post("/", roleController.createRole);

router.get("/", roleController.getAllRole);

router.get("/:id", roleController.getRoleById);

router.put("/:id", roleController.updateRoleById);

module.exports = router;
