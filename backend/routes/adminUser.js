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
    middlewareController.verifyTokenAndSystemUserAuth,
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

router.put(
    "/passwordChange/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.passwordChangeByAdmin
);

router.put(
    "/resetPassword/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    adminUserController.resetPassword
);

module.exports = router;
