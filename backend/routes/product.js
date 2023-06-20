const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../controllers/imageStorageController");

router.post(
    "/online",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.createProductOnline
);

router.get(
    "/search",
    // middlewareController.verifyTokenAndSystemUserAuth,
    productController.productSearch
);

router.post(
    "/checkQuantityAllow",
    // middlewareController.verifyTokenAndSystemUserAuth,
    productController.checkProductQuantityAllow
);

router.post(
    "/local",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    productController.createProductLocal
);

router.put(
    "/discount/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.addDiscount
);

router.get(
    "/",
    // middlewareController.verifyTokenAndSystemUserAuth,
    productController.getAllProduct
);

router.get(
    "/:id",
    // middlewareController.verifyToken,
    productController.getProductById
);

router.get(
    "/:searchTerm/searchTerm",
    // middlewareController.verifyToken,
    productController.searchTerm
);

router.get("/:id/customer", productController.getProductById);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    productController.updateProductByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    productController.deleteProductById
);

module.exports = router;
