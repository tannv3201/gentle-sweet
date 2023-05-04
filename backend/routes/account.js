const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const middlewareController = require("../controllers/middlewareController");

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    accountController.getlAllAccount
);

router.get("/:id", accountController.getAccountById);

router.put("/:id", accountController.updateAccountById);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    accountController.deleteAccountById
);

module.exports = router;
