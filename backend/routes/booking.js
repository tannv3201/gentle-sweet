const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const middlewareController = require("../controllers/middlewareController");

// Confirm & cancel invoice
router.put(
    "/confirm/:id",
    middlewareController.verifyToken,
    bookingController.confirmBookingById
);

router.put(
    "/cancel/:id",
    middlewareController.verifyToken,
    bookingController.cancelBookingById
);

router.post(
    "/",
    middlewareController.verifyToken,
    bookingController.createBooking
);

router.get(
    "/",
    middlewareController.verifyToken,
    bookingController.getAllBooking
);

router.get(
    "/search",
    middlewareController.verifyTokenAndSystemUserAuth,
    bookingController.bookingSearch
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
