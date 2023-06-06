const express = require("express");
const router = express.Router();
const registerVerifyController = require("../controllers/registerVerifyController");

router.post("/checkEmailExists", registerVerifyController.checkEmailExists);

router.post("/sendVerifyCode", registerVerifyController.sendVerifyCode);

router.get(
    "/register/checkVerifyCode",
    registerVerifyController.checkVerifyCode
);

module.exports = router;
