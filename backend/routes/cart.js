const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const middlewareController = require("../controllers/middlewareController");

router.post("/", middlewareController.verifyToken, cartController.createCart);

router.get("/", middlewareController.verifyToken, cartController.getAllCart);

router.get(
    "/search",
    // middlewareController.verifyTokenAndSystemUserAuth,
    cartController.cartSearch
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    cartController.getCartById
);

router.get(
    "/:id/customer",
    middlewareController.verifyToken,
    cartController.getCartByUserId
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    cartController.updateCartById
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    cartController.deleteCartById
);

module.exports = router;
