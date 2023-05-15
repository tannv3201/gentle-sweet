const express = require("express");
const router = express.Router();
const productImageController = require("../controllers/productImageController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../controllers/imageStorageController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    upload.single("image"),
    productImageController.createProductImage
);

router.delete(
    "/images/:filename",
    middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.deleteImageInFolder
);

router.get(
    "/images/:pathname",
    // middlewareController.verifyTokenAndSystemUserAuth,
    productImageController.getImageByPathName
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
    "/images/:productId/product",
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
