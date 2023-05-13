const express = require("express");
const router = express.Router();
const customerUserController = require("../controllers/customerUserController");
const middlewareController = require("../controllers/middlewareController");

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    customerUserController.getlAllCustomerUser
);

router.post(
    "/create",
    middlewareController.verifyTokenAndSystemUserAuth,
    customerUserController.createCustomerUser
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    customerUserController.getCustomerUserById
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    customerUserController.updateCustomerUserById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    customerUserController.deleteCustomerUserById
);

router.put(
    "/passwordChange/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    customerUserController.passwordChangeByAdmin
);

router.put(
    "/resetPassword/:id",
    middlewareController.verifyTokenAndSuperAdminAuth,
    customerUserController.resetPassword
);

module.exports = router;
