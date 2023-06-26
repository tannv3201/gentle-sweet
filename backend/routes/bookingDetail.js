const express = require("express");
const router = express.Router();
const bookingDetailController = require("../controllers/bookingDetailController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    bookingDetailController.createBookingDetail
);

router.get(
    "/",
    middlewareController.verifyToken,
    bookingDetailController.getAllBookingDetail
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    bookingDetailController.getBookingDetailById
);

router.get(
    "/:id/user",
    middlewareController.verifyToken,
    bookingDetailController.getBookingDetailByUser
);

router.get(
    "/filterBookingTime/checkDuplicate",
    middlewareController.verifyToken,
    bookingDetailController.getBookingTimeList
);

router.get(
    "/:bookingId/bookingDetail",
    middlewareController.verifyToken,
    bookingDetailController.getBookingDetailByBookingId
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    bookingDetailController.updateBookingDetailById
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    bookingDetailController.deleteBookingDetailById
);

module.exports = router;
