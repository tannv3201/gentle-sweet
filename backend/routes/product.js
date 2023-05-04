const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productController.createProduct
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productController.getAllProduct
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productController.getProductById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productController.updateProductByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productController.deleteProductById
);

module.exports = router;
