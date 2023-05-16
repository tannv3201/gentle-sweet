const express = require("express");
const router = express.Router();
const storageImageController = require("../controllers/storageImageController");

router.get(
    "/images/:pathname",
    // middlewareController.verifyTokenAndSystemUserAuth,
    storageImageController.getImageByPathName
);

module.exports = router;
