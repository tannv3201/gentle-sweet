const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    discountController.createDiscount
);

router.get(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    discountController.getAllDiscount
);

router.get("/customer", discountController.getAllDiscount);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    discountController.getDiscountById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    discountController.updateDiscountByID
);

router.delete(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    discountController.deleteDiscountById
);

module.exports = router;
