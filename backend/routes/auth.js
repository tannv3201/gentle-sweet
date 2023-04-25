const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Refresh token
router.post("/refresh", authController.requestRefreshToken);

// Logout
router.post(
    "/logout",
    middlewareController.verifyToken,
    authController.userLogout
);

module.exports = router;
