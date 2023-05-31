const express = require("express");
const router = express.Router();
const serviceCategoryController = require("../controllers/serviceCategoryController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceCategoryController.createServiceCategory
);

router.get(
    "/",
    // middlewareController.verifyToken,
    serviceCategoryController.getAllServiceCategory
);

router.get(
    "/:id",
    // middlewareController.verifyToken,
    serviceCategoryController.getServiceCategoryById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceCategoryController.updateServiceCategoryById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    serviceCategoryController.deleteServiceCategoryById
);

module.exports = router;
