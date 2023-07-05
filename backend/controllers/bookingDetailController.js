const BookingDetailModel = require("../models/BookingDetail");
const BookingModal = require("../models/Booking");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");
require("dotenv").config();
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
                subject: "YÊU CẦU ĐẶT LỊCH HẸN", // Subject line
                // text: "Hello world?", // plain text body
                html: ` <div style="color: #000">
                    <strong style="color: #000">YÊU CẦU ĐẶT LỊCH HẸN</strong>
                    <p style="color: #000">Xin chào ${
                        req.body.customer_name
                    }, bạn đã gửi yêu cầu đặt lịch hẹn thành công.</p>
<ul>
<li>Tên dịch vụ: <strong>${req.body.service_name}</strong></li>
<li>Ngày thực hiện dịch vụ: <strong>${dayjs(req.body.date).format(
                    "DD-MM-YYYY"
                )}</strong></li>
                <li>Thời gian bắt đầu: <strong>${
                    req.body.start_time
                }</strong></li>
                <li>Thời gian kết thúc: <strong>${
                    req.body.end_time
                }</strong></li>
</ul>
                    <p style="color: #000">Quý khách vui lòng kiểm tra, theo dõi và thực hiện theo đúng chính sách đặt lịch của chúng tôi.</p>
                    <p style="color: #000">Chúc Quý khách luôn có những trải nghiệm tuyệt vời tại <strong>GentleBeauty</strong></p>
                    <p>Trân trọng,</p>
                    <strong style="color: #000">
                    Gentle Beauty.
                    </strong>
                  </div>`, // html body
            });

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
            const {
                admin_user_id,
                booking_id,
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
            const affectedRows =
                await BookingDetailModel.updateBookingDetailById(
                    bookingDetailId,
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
