const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    deliveryController.createDelivery
);

router.get(
    "/",
    middlewareController.verifyToken,
    deliveryController.getAllDelivery
);

router.get(
    "/:id/customer",
    middlewareController.verifyToken,
    deliveryController.getDeliveryByUserId
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    deliveryController.getDeliveryById
);

router.get(
    "/invoice/:id",
    middlewareController.verifyToken,
    deliveryController.getDeliveryByInvoiceId
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    deliveryController.updateDeliveryByID
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    deliveryController.deleteDiscountById
);

module.exports = router;
