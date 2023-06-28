const express = require("express");
const router = express.Router();
const importExcelController = require("../controllers/importExcelController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../controllers/multerExcelController");
router.post(
    "/importExcel",
    upload.single("file"),
    middlewareController.verifyTokenAndSuperAdminAuth,
    importExcelController.importExcel
);

module.exports = router;
