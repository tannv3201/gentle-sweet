const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    serviceController.createService
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    serviceController.getAllService
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceController.getServiceById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceController.updateServiceByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceController.deleteServiceById
);

module.exports = router;
