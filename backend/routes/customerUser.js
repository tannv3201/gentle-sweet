const express = require("express");
const router = express.Router();
const customerUserController = require("../controllers/customerUserController");
const middlewareController = require("../controllers/middlewareController");

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    customerUserController.getlAllCustomerUser
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

module.exports = router;
