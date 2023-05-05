const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    bookingController.createBooking
);

router.post(
    "/bookingDetail",
    middlewareController.verifyToken,
    bookingController.createBookingDetail
);

router.get(
    "/",
    middlewareController.verifyToken,
    bookingController.getAllBooking
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    bookingController.getBookingById
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    bookingController.updateBookingById
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    bookingController.deleteBookingById
);

module.exports = router;
