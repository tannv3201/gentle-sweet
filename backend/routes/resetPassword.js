const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.get("/email/:email", resetPasswordController.findUserByEmail);

router.get("/checkVerifyCode", resetPasswordController.checkVerifyCode);

router.put("/passwordChange/:id", resetPasswordController.passwordChange);

module.exports = router;
