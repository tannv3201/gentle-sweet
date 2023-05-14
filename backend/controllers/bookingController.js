const BookingModel = require("../models/Booking");
const BookingDetailModel = require("../models/BookingDetail");
const ServiceModel = require("../models/Service");

const { v4: uuidv4 } = require("uuid");

const bookingController = {
    // GET ALL INVOICE
    getAllBooking: async (req, res) => {
        try {
            const bookings = await BookingModel.getAllBooking();
            return res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getBookingById: async (req, res) => {
        try {
            const booking = await BookingModel.getBookingById(req.params.id);
            if (!booking) {
                return res.status(404).json("Lịch đặt không tồn tại");
            } else {
                return res.status(200).json(booking);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createBooking: async (req, res, next) => {
        try {
            const newBooking = await BookingModel.createBooking({
                customer_user_id: req.user.id,
                status: 1,
            });

            const getService = await ServiceModel.getServiceById(
                req.body.service_id
            );

            const newBookingDetail =
                await BookingDetailModel.createBookingDetail({
                    id: uuidv4(),
                    booking_id: newBooking.id,
                    staff_id: req.body.staff_id,
                    service_id: req.body.service_id,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                    price: getService?.price,
                    status: 1,
                });

            const affectedRows = await BookingModel.updateBookingById(
                newBooking?.id,
                {
                    price_total: getService?.price,
                }
            );
            if (affectedRows !== 0) {
                res.status(201).json(newBooking);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create invoice detail
    createBookingDetail: async (req, res, next) => {
        try {
            const booking = await BookingModel.getBookingByCustomerUserId(
                req.user.id
            );

            const getService = await ServiceModel.getServiceById(
                req.body.service_id
            );

            const newBookingDetail =
                await BookingDetailModel.createBookingDetail({
                    id: uuidv4(),
                    booking_id: booking?.id,
                    staff_id: req.body.staff_id,
                    service_id: req.body.service_id,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                    price: getService?.price,
                    status: 1,
                });

            const getAllBookingDetails =
                await BookingDetailModel.getBookingDetailByBookingId(
                    booking?.id
                );

            let total = getAllBookingDetails.reduce(
                (accumulator, currentValue) => {
                    let price = parseFloat(currentValue.price);
                    return accumulator + price;
                },
                0
            );

            const affectedRows = await BookingModel.updateBookingById(
                booking?.id,
                {
                    price_total: total,
                }
            );
            if (affectedRows !== 0) {
                res.status(201).json(newBookingDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE BY ID
    updateBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await BookingModel.updateBookingById(
                bookingId,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE INVOICE BY ID
    deleteBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const affectedRows = await BookingModel.updateBookingById(
                bookingId,
                { status: 0 }
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Xóa thất bại" });
            } else {
                return res.status(200).json({ message: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = bookingController;
