const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

router.get("/", middlewareController.verifyToken, userController.getlAllUser);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserByID);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    userController.deleteUserById
);

module.exports = router;
