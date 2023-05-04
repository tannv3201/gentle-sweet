const express = require("express");
const router = express.Router();
const serviceCategoryController = require("../controllers/serviceCategoryController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    serviceCategoryController.createServiceCategory
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    serviceCategoryController.getAllServiceCategory
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceCategoryController.getServiceCategoryById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceCategoryController.updateServiceCategoryById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    serviceCategoryController.deleteServiceCategoryById
);

module.exports = router;
