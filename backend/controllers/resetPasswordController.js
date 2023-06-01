const ResetPasswordModel = require("../models/ResetPassword");
const CustomerUserModel = require("../models/CustomerUser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

const resetPasswordController = {
    findUserByEmail: async (req, res) => {
        try {
            const user = await ResetPasswordModel.findCustomerUserByEmail(
                req.params.email
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ status: 404, msg: "Email không tồn tại" });
            }
            const generateCode = () => {
                let code = Math.floor(100000 + Math.random() * 900000);
                return code;
            };
            const verifyCode = generateCode();
            const createResetPassword =
                await ResetPasswordModel.createResetPassword({
                    customer_user_id: user?.id,
                    random_code: verifyCode,
                });
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
                to: user?.email, // list of receivers
                subject: "Đặt lại mật khẩu 🔑", // Subject line
                // text: "Hello world?", // plain text body
                html: ` <div style="color: #000">
                <strong style="color: #000">Yêu cầu cấp lại mật khẩu.</strong>
                <p style="color: #000">Mã của bạn là: <strong>${verifyCode}</strong></p>
                <p style="color: #000">Mã này có hiệu lực <strong><i>15 phút</i></strong></p>
                <p style="color: #000">Nếu bạn không phải người yêu cầu. Vui lòng bỏ qua tin nhắn này.</p>
                <p>Trân trọng,</p>
                <strong style="color: #000">
                Gentle Beauty.
                </strong>
              </div>`, // html body
            });

            return res.status(200).json({
                status: 200,
                email: user?.email,
                codeId: createResetPassword?.insertId,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    checkVerifyCode: async (req, res) => {
        try {
            const { verifyCodeCustomer, codeId } = req.query;
            const verifyCode = await ResetPasswordModel.checkVerifyCode(codeId);
            const submitTime = new Date();
            const allowTime = 15;
            const realTime = (submitTime - verifyCode?.created_at) / 60000;
            if (realTime <= allowTime) {
                if (
                    parseInt(verifyCodeCustomer) !==
                    parseInt(verifyCode?.random_code)
                ) {
                    return res.json({ status: 404, msg: "Mã không hợp lệ" });
                }

                return res.status(200).json({
                    status: 200,
                    msg: "Mã hợp lệ",
                    customerUserId: verifyCode?.id,
                });
            } else {
                return res.json({
                    status: 404,
                    msg: "Mã đã hết hạn sử dụng",
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    passwordChange: async (req, res) => {
        try {
            const customerUserId = req.params.id;

            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(req.body.password, salt);

            const affectedRows = await CustomerUserModel.updateCustomerUserById(
                customerUserId,
                {
                    password: newPassword,
                }
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Cập nhật mật khẩu thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Cập nhật mật khẩu thành công",
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = resetPasswordController;
