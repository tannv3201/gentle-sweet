const express = require("express");
const router = express.Router();
const serviceImageController = require("../controllers/serviceImageController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../controllers/imageStorageController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    serviceImageController.createServiceImage
);

router.delete(
    "/images/:filename",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.deleteImageInFolder
);

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.getAllServiceImage
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.getServiceImageById
);

router.get(
    "/images/:serviceId/service",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.getServiceImageByServiceId
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.updateServiceImageById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceImageController.deleteServiceImageById
);

module.exports = router;
