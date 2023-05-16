const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/online",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.createProductOnline
);

router.post(
    "/local",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.createProductLocal
);

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.getAllProduct
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.getProductById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.updateProductByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.deleteProductById
);

module.exports = router;
