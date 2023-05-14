const express = require("express");
const router = express.Router();
const productImageController = require("../controllers/productImageController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.createProductImage
);

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.getAllProductImage
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.getProductImageById
);

router.get(
    "/productImage/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.getProductImageByProductId
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.updateProductImageById
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.deleteProductImageById
);

module.exports = router;
