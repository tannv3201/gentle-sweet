const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.createService
);

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.getAllService
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.getServiceById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.updateServiceByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceController.deleteServiceById
);

module.exports = router;
