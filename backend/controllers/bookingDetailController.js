const BookingDetailModel = require("../models/BookingDetail");
const BookingModal = require("../models/Booking");
const dayjs = require("dayjs");
// dayjs.extend(utc);
const bookingTimeDefault = [
    {
        id: 1,
        name: "7:00 - 09:00",
        start_time: "07:00:00",
        end_time: "09:00:00",
    },
    {
        id: 2,
        name: "09:00 - 11:00",
        start_time: "09:00:00",
        end_time: "11:00:00",
    },
    {
        id: 3,
        name: "13:00 - 15:00",
        start_time: "13:00:00",
        end_time: "15:00:00",
    },
    {
        id: 4,
        name: "15:00 - 17:00",
        start_time: "15:00:00",
        end_time: "17:00:00",
    },
];

const bookingController = {
    getBookingTimeList: async (req, res) => {
        try {
            const { customer_user_id, branch_id, date } = req.query;

            const params = {
                customer_user_id: customer_user_id,
                branch_id: branch_id,
                date: date,
            };

            const bookingDateTimeList =
                await BookingDetailModel.getBookingTimeList(
                    customer_user_id,
                    date
                );
            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = bookingDateTimeList?.find(
                    (booking) =>
                        dayjs(booking?.date).format("YYYY-MM-DD").toString() ===
                            date &&
                        booking.start_time === option.start_time &&
                        parseInt(branch_id) === booking?.branch_id
                );
                return !matchingBooking;
            });
            return res.status(200).json(filteredOptions);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE DETAIL BY ID
    getBookingDetailByUser: async (req, res) => {
        try {
            const bookingDetail =
                await BookingDetailModel.getBookingDetailByUser(req.params.id);
            if (!bookingDetail) {
                return res.json({ status: 404, msg: "Lịch đặt không tồn tại" });
            } else {
                return res.status(200).json(bookingDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET ALL INVOICE DETAIL
    getAllBookingDetail: async (req, res) => {
        try {
            const bookingDetails =
                await BookingDetailModel.getAllBookingDetail();
            return res.status(200).json(bookingDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE DETAIL BY ID
    getBookingDetailById: async (req, res) => {
        try {
            const bookingDetail = await BookingDetailModel.getBookingDetailById(
                req.params.id
            );
            if (!bookingDetail) {
                return res.status(404).json("Lịch đặt không tồn tại");
            } else {
                return res.status(200).json(bookingDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE DETAIL BY ID
    getBookingDetailByBookingId: async (req, res) => {
        try {
            const bookingDetail =
                await BookingDetailModel.getBookingDetailByBookingId(
                    req.params.bookingId
                );
            if (!bookingDetail) {
                return res.status(404).json("Chi tiết lịch đặt không tồn tại");
            } else {
                return res.status(200).json(bookingDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createBookingDetail: async (req, res, next) => {
        try {
            const newBookingDetail =
                await BookingDetailModel.createBookingDetail({
                    booking_id: req.body.booking_id,
                    service_id: req.body.service_id,
                    start_time: req.body.start_time,
                    date: req.body.date,
                    end_time: req.body.end_time,
                    unit_price: req.body.unit_price,
                    note: req.body.note,
                    status: 1,
                });

            const updateTotalPrice =
                await BookingDetailModel.updatePriceTotalBooking(
                    req.body.booking_id
                );

            return res.json({
                status: 201,
                msg: "Thêm chi tiết lịch hẹn thành công",
                data: newBookingDetail,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE DETAIL BY ID
    updateBookingDetailById: async (req, res) => {
        try {
            const bookingDetailId = req.params.id;
            const { admin_user_id, booking_id, ...data } = req.body;
            const affectedRows =
                await BookingDetailModel.updateBookingDetailById(
                    bookingDetailId,
                    data
                );

            await BookingDetailModel.updatePriceTotalBooking(booking_id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE INVOICE DETAIL BY ID
    // deleteInvoiceById: async (req, res) => {
    //     try {
    //         const invoiceId = req.params.id;
    //         const affectedRows = await BookingDetailModel.updateInvoiceById(
    //             invoiceId,
    //             { status: 0 }
    //         );
    //         if (affectedRows === 0) {
    //             return res.status(404).json({ message: "Xóa thất bại" });
    //         } else {
    //             return res.status(200).json({ message: "Xóa thành công" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    // DELETE INVOICE DETAIL BY ID
    deleteBookingDetailById: async (req, res) => {
        try {
            const getDeleteBookingDetail =
                await BookingDetailModel.getBookingDetailById(req.params.id);

            const affectedRows =
                await BookingDetailModel.deleteBookingDetailById(req.params.id);

            const bookingDetailByBooking =
                await BookingDetailModel.getBookingDetailByBookingId(
                    getDeleteBookingDetail?.booking_id
                );

            if (bookingDetailByBooking?.length !== 0) {
                await BookingDetailModel.updatePriceTotalBooking(
                    getDeleteBookingDetail?.booking_id
                );
            } else {
                await BookingModal.updateInvoiceById(
                    getDeleteBookingDetail?.booking_id,
                    {
                        price_total: 0,
                    }
                );
            }

            if (affectedRows === 0) {
                return res.status(404).json({ message: "Xóa thất bại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = bookingController;
