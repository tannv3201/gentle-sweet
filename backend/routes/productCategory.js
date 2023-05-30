const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategoryController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    productCategoryController.createProductCategory
);

router.get(
    "/",
    // middlewareController.verifyTokenAndSystemUserAuth,
    productCategoryController.getAllProductCategory
);

router.get("/customer", productCategoryController.getAllProductCategory);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productCategoryController.getProductCategoryById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productCategoryController.updateProductCategoryByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productCategoryController.deleteProductCategoryById
);

module.exports = router;
