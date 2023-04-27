const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    servicesController.createService
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    servicesController.getAllService
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    servicesController.getServiceById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    servicesController.updateServiceByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    servicesController.deleteServiceById
);

module.exports = router;
