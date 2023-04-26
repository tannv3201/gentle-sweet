const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productsController.createProduct
);

router.get(
    "/",
    middlewareController.verifyTokenAndAdminAuth,
    productsController.getAllProduct
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productsController.getProductById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productsController.updateProductByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndAdminAuth,
    productsController.deleteProductById
);

module.exports = router;
