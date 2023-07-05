const BookingModel = require("../models/Booking");
const BookingDetailModel = require("../models/BookingDetail");
const ServiceModel = require("../models/Service");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");
const dayjs = require("dayjs");
require("dotenv").config();
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
                branch_id,
            } = req.query;

            const params = {};
            if (status) params.status = status;
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (customer_user_id) params.customer_user_id = customer_user_id;
            if (branch_id) params.branch_id = branch_id;
            if (booking_time) params.booking_time = booking_time;

            const bookings = await BookingModel.bookingSearch(params);
            if (!bookings) {
                return res.status(404).json("Lịch hẹn không tồn tại");
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

    // GET INVOICE BY ID
    getBookingByUserId: async (req, res) => {
        try {
            const bookings = await BookingModel.getBookingByCustomerUserId(
                req.params.id
            );
            if (!bookings) {
                return res.status(404).json("Lịch đặt không tồn tại");
            } else {
                return res.status(200).json(bookings);
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
                branch_id: req.body.branch_id,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm lịch hẹn thành công",
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
            // const { admin_user_id, ...data } = req.body;
            const {
                admin_user_id,
                service_name,
                customer_email,
                start_time,
                end_time,
                date,
                customer_name,
                created_at,
                isRejectCancel,
                isConfirm,
                ...data
            } = req.body;
            const affectedRows = await BookingModel.updateBookingById(
                bookingId,
                data
            );

            if (req.body.status === 6) {
                let transporter = nodemailer.createTransport({
                    host: mailConfig.HOST,
                    port: mailConfig.PORT,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: mailConfig.USERNAME, // generated ethereal user
                        pass: mailConfig.PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: mailConfig.FROM_ADDRESS, // sender address
                    to: req.body.customer_email, // list of receivers
                    subject: "HỦY LỊCH HẸN THÀNH CÔNG", // Subject line
                    // text: "Hello world?", // plain text body
                    html: ` <div style="color: #000">
                            <p style="color: #000">Xin chào ${
                                req.body.customer_name
                            }, bạn đã hủy lịch hẹn thành công.</p>
                            <ul>
                            <li>Tên dịch vụ: <strong>${
                                req.body.service_name
                            }</strong></li>
                            <li>Ngày đặt lịch: <strong>${dayjs(
                                req.body.created_at
                            ).format("DD-MM-YYYY")}</strong></li>
                            <li>Ngày thực hiện dịch vụ: <strong>${dayjs(
                                req.body.date
                            ).format("DD-MM-YYYY")}</strong></li>
                            <li>Thời gian bắt đầu: <strong>${
                                req.body.start_time
                            }</strong></li>
                            <li>Thời gian kết thúc: <strong>${
                                req.body.end_time
                            }</strong></li>
                            </ul>
                            <p style="color: #000">Mọi thông tin chi tiết xin liên hệ:</p>
                            <ul>
                                <li>Số điện thoại: <strong>0399 859 634</strong>
                                </li>
                                <li>Email: <strong>gentlebeauty.cskh@gmail.com</strong>
                                </li>
                            </ul>
                            <p style="color: #000">Chúc Quý khách luôn có những trải nghiệm tuyệt vời tại <strong>GentleBeauty</strong></p>
                            <p>Trân trọng,</p>
                            <strong style="color: #000">
                            Gentle Beauty.
                            </strong>
                        </div>`, // html body
                });
            } else if (req.body.status === 7) {
                let transporter = nodemailer.createTransport({
                    host: mailConfig.HOST,
                    port: mailConfig.PORT,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: mailConfig.USERNAME, // generated ethereal user
                        pass: mailConfig.PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: mailConfig.FROM_ADDRESS, // sender address
                    to: req.body.customer_email, // list of receivers
                    subject: "YÊU CẦU HỦY LỊCH HẸN", // Subject line
                    // text: "Hello world?", // plain text body
                    html: ` <div style="color: #000">
                            <p style="color: #000">Xin chào ${
                                req.body.customer_name
                            }, bạn đã gửi yêu cầu hủy lịch hẹn thành công.</p>
                            <ul>
                            <li>Tên dịch vụ: <strong>${
                                req.body.service_name
                            }</strong></li>
                            <li>Ngày đặt lịch: <strong>${dayjs(
                                req.body.created_at
                            ).format("DD-MM-YYYY")}</strong></li>
                            <li>Ngày thực hiện dịch vụ: <strong>${dayjs(
                                req.body.date
                            ).format("DD-MM-YYYY")}</strong></li>
                            <li>Thời gian bắt đầu: <strong>${
                                req.body.start_time
                            }</strong></li>
                            <li>Thời gian kết thúc: <strong>${
                                req.body.end_time
                            }</strong></li>
                            </ul>
                            <p style="color: #000">Quý khách vui lòng đợi sự chấp thuận từ chúng tôi.</p>
                            <p style="color: #000">Mọi thông tin chi tiết xin liên hệ:</p>
                            <ul>
                                <li>Số điện thoại: <strong>0399 859 634</strong>
                                </li>
                                <li>Email: <strong>gentlebeauty.cskh@gmail.com</strong>
                                </li>
                            </ul>
                            <p style="color: #000">Chúc Quý khách luôn có những trải nghiệm tuyệt vời tại <strong>GentleBeauty</strong></p>
                            <p>Trân trọng,</p>
                            <strong style="color: #000">
                            Gentle Beauty.
                            </strong>
                            </div>`, // html body
                });
            } else if (req.body.status === 2 && req.body.isRejectCancel) {
                let transporter = nodemailer.createTransport({
                    host: mailConfig.HOST,
                    port: mailConfig.PORT,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: mailConfig.USERNAME, // generated ethereal user
                        pass: mailConfig.PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: mailConfig.FROM_ADDRESS, // sender address
                    to: req.body.customer_email, // list of receivers
                    subject: "HỦY LỊCH HẸN KHÔNG THÀNH CÔNG", // Subject line
                    // text: "Hello world?", // plain text body
                    html: ` <div style="color: #000">
                            <p style="color: #000">Xin chào ${
                                req.body.customer_name
                            }, yêu cầu hủy lịch hẹn của bạn đã bị <strong>từ chối</strong>.</p>
                            <ul>
                                <li>Tên dịch vụ: <strong>${
                                    req.body.service_name
                                }</strong>
                                </li>
                                <li>Ngày đặt lịch: <strong>${dayjs(
                                    req.body.created_at
                                ).format("DD-MM-YYYY")}</strong>
                                </li>
                                <li>Ngày thực hiện dịch vụ: <strong>${dayjs(
                                    req.body.date
                                ).format("DD-MM-YYYY")}</strong>
                                </li>
                                <li>Thời gian bắt đầu: <strong>${
                                    req.body.start_time
                                }</strong>
                                </li>
                                <li>Thời gian kết thúc: <strong>${
                                    req.body.end_time
                                }</strong>
                                </li>
                            </ul>
                            <p style="color: #000">Mọi thông tin chi tiết xin liên hệ:</p>
                            <ul>
                                <li>Số điện thoại: <strong>0399 859 634</strong>
                                </li>
                                <li>Email: <strong>gentlebeauty.cskh@gmail.com</strong>
                                </li>
                            </ul>

                            <p style="color: #000">Chúc Quý khách luôn có những trải nghiệm tuyệt vời tại <strong>GentleBeauty</strong></p>
                            <p>Trân trọng,</p>
                            <strong style="color: #000">
                            Gentle Beauty.
                            </strong>
                            </div>`, // html body
                });
            } else if (req.body.status === 2 && req.body.isConfirm) {
                let transporter = nodemailer.createTransport({
                    host: mailConfig.HOST,
                    port: mailConfig.PORT,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: mailConfig.USERNAME, // generated ethereal user
                        pass: mailConfig.PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: mailConfig.FROM_ADDRESS, // sender address
                    to: req.body.customer_email, // list of receivers
                    subject: "ĐẶT LỊCH HẸN THÀNH CÔNG", // Subject line
                    // text: "Hello world?", // plain text body
                    html: ` <div style="color: #000">
                            <p style="color: #000">Xin chào ${
                                req.body.customer_name
                            }, yêu cầu đặt lịch hẹn của bạn đã được <strong>tiếp nhận</strong>.</p>
                            <ul>
                                <li>Tên dịch vụ: <strong>${
                                    req.body.service_name
                                }</strong>
                                </li>
                                <li>Ngày đặt lịch: <strong>${dayjs(
                                    req.body.created_at
                                ).format("DD-MM-YYYY")}</strong>
                                </li>
                                <li>Ngày thực hiện dịch vụ: <strong>${dayjs(
                                    req.body.date
                                ).format("DD-MM-YYYY")}</strong>
                                </li>
                                <li>Thời gian bắt đầu: <strong>${
                                    req.body.start_time
                                }</strong>
                                </li>
                                <li>Thời gian kết thúc: <strong>${
                                    req.body.end_time
                                }</strong>
                                </li>
                            </ul>
                            <p style="color: #000">Mọi thông tin chi tiết xin liên hệ:</p>
                            <ul>
                                <li>Số điện thoại: <strong>0399 859 634</strong>
                                </li>
                                <li>Email: <strong>gentlebeauty.cskh@gmail.com</strong>
                                </li>
                            </ul>
                            <p style="color: #000">Quý khách vui lòng kiểm tra, theo dõi và thực hiện theo đúng chính sách đặt lịch của chúng tôi.</p>
                            <p style="color: #000">Chúc Quý khách luôn có những trải nghiệm tuyệt vời tại <strong>GentleBeauty</strong></p>
                            <p>Trân trọng,</p>
                            <strong style="color: #000">
                            Gentle Beauty.
                            </strong>
                            </div>`, // html body
                });
            }

            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
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
                    admin_user_id: admin_user_id,
                }
            );
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Xác nhận lịch hẹn thành công",
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
                    msg: "Hủy lịch hẹn thành công",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = bookingController;
