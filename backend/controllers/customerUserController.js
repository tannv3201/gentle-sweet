const customerUserModel = require("../models/CustomerUser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const customerUserController = {
    createCustomerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newAdminUser = await customerUserModel.createCustomerUser({
                id: uuidv4(),
                role_id: "5c14eaf0-60cf-4a80-a7cc-43da53962990",
                username: req.body.username,
                password: hashed,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                province: req.body.province,
                district: req.body.district,
                ward: req.body.ward,
                email: req.body.email,
                detail_address: req.body.detail_address,
                birth_date: req.body.birth_date,
                status: 1,
            });
            // res.status(201).json(newAdminUser);
            return res.json({
                newAdminUser,
                status: 201,
                msg: "Thêm thành công",
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET ALL CUSTOMER USER
    getlAllCustomerUser: async (req, res) => {
        try {
            const customerUsers = await customerUserModel.getAllCustomerUser();
            return res.status(200).json(customerUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET CUSTOMER USER BY ID
    getCustomerUserById: async (req, res) => {
        try {
            const customerUser = await customerUserModel.getCustomerUserById(
                req.params.id
            );
            if (!customerUser) {
                return res.status(404).json("Người dùng không tồn tại");
            } else {
                return res.status(200).json(customerUser);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE CUSTOMER USER BY ID
    updateCustomerUserById: async (req, res) => {
        try {
            const customerUserId = req.params.id;
            const updateCustomerUserData = { ...req.body };

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                updateAdminUserData.password = hashed;
            }

            const affectedRows = await customerUserModel.updateCustomerUserById(
                customerUserId,
                updateCustomerUserData
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Tài khoản không tồn tại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Password change by admin
    passwordChangeByAdmin: async (req, res, next) => {
        try {
            const accountId = req.params.id;
            const user = await customerUserModel.getCustomerUserById(accountId);
            const validPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            );

            if (!validPassword) {
                return res.json({
                    msg: "Mật khẩu hiện tại không chính xác",
                    status: 401,
                });
            }

            if (validPassword) {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(
                    req.body.newPassword,
                    salt
                );

                const affectedRows =
                    await customerUserModel.updateCustomerUserById(accountId, {
                        password: newPassword,
                    });
                if (affectedRows === 0) {
                    return res
                        .status(404)
                        .json({ message: "Tài khoản không tồn tại" });
                } else {
                    return res.json({
                        status: 200,
                        msg: "Đổi mật khẩu thành công",
                    });
                }
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Reset password by admin
    resetPassword: async (req, res, next) => {
        try {
            const accountId = req.params.id;
            const user = await customerUserModel.getCustomerUserById(accountId);

            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(user?.username, salt);

            const affectedRows = await customerUserModel.updateCustomerUserById(
                accountId,
                {
                    password: newPassword,
                }
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Tài khoản không tồn tại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Đặt lại mật khẩu thành công",
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // DELETE CUSTOMER USER BY ID
    deleteCustomerUserById: async (req, res) => {
        try {
            const customerUserId = req.params.id;
            const affectedRows = await customerUserModel.updateCustomerUserById(
                customerUserId,
                {
                    status: 0,
                }
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Tài khoản không tồn tại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = customerUserController;
