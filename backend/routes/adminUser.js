const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const middlewareController = require("../controllers/middlewareController");

// Register
router.post(
    "/",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.createAdminUser
);

router.get(
    "/",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.getlAllAdminUser
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.getAdminUserById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.updateAdminUserById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.deleteAccountById
);

module.exports = router;
