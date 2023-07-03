const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    ratingController.createRating
);

router.get(
    "/",
    middlewareController.verifyToken,
    ratingController.getAllRating
);

router.get("/service/:id", ratingController.getRatingByServiceId);

router.get("/product/:id", ratingController.getRatingByProductId);

module.exports = router;
