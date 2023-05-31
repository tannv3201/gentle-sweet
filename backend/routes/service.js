const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../controllers/imageStorageController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    serviceController.createService
);

router.get(
    "/search",
    // middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.serviceSearch
);

router.get(
    "/",
    middlewareController.verifyToken,
    serviceController.getAllService
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    serviceController.getServiceById
);

router.put(
    "/discount/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.addDiscount
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    serviceController.updateServiceByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.deleteServiceById
);

module.exports = router;
