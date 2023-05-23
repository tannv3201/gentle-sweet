const BookingModel = require("../models/Booking");
const BookingDetailModel = require("../models/BookingDetail");
const ServiceModel = require("../models/Service");

const { v4: uuidv4 } = require("uuid");

const bookingController = {
    bookingSearch: async (req, res) => {
        try {
            const {
                status,
                startDate,
                endDate,
                customer_user_id,
                booking_time,
            } = req.query;

            const params = {};
            if (status) params.status = status;
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (customer_user_id) params.customer_user_id = customer_user_id;
            if (booking_time) params.booking_time = booking_time;

            const bookings = await BookingModel.bookingSearch(params);
            if (!bookings) {
                return res.status(404).json("Đơn hàng không tồn tại");
            } else {
                return res.status(200).json(bookings);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

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
                customer_user_id: req.body.customer_user_id,
                admin_user_id: req.body.admin_user_id,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm lịch đặt thành công",
                data: newBooking,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE BOOKING BY ID
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

    // CONFIRM BOOKING BY ID
    confirmBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await BookingModel.updateBookingById(
                bookingId,
                {
                    status: 2,
                }
            );
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Xác nhận lịch đặt thành công",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // CANCEL Booking BY ID
    cancelBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await BookingModel.updateBookingById(
                bookingId,
                {
                    status: 5,
                }
            );
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Hủy lịch đặt thành công",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = bookingController;
