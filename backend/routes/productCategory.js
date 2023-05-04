const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategoryController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productCategoryController.createProductCategory
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productCategoryController.getAllProductCategory
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productCategoryController.getProductCategoryById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productCategoryController.updateProductCategoryByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productCategoryController.deleteProductCategoryById
);

module.exports = router;
