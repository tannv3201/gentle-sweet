const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const middlewareController = require("../controllers/middlewareController");

router.get("/", middlewareController.verifyToken, userController.getlAllUser);

router.get(
    "/:id",
    middlewareController.verifyToken,
    userController.getUserById
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    userController.updateUserByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    userController.deleteUserById
);

module.exports = router;
