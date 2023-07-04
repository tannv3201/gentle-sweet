const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSuperAdminAuth,
    roleController.createRole
);

router.get(
    "/",
    middlewareController.verifyTokenAndSuperAdminAuth,
    roleController.getAllRole
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    roleController.getRoleById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    roleController.updateRoleById
);

module.exports = router;
