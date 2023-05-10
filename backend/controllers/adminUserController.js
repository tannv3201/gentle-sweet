const adminUserModel = require("../models/AdminUser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const adminUserController = {
    // Create
    createAdminUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newAdminUser = await adminUserModel.createAdminUser({
                id: uuidv4(),
                role_id: req.body.role_id,
                username: req.body.username,
                password: hashed,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
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

    // GET ALL ACCOUNT
    getlAllAdminUser: async (req, res) => {
        try {
            const adminUsers = await adminUserModel.getAllAdminUser(0);
            return res.status(200).json(adminUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET ACCOUNT BY ID
    getAdminUserById: async (req, res) => {
        try {
            const adminUser = await adminUserModel.getAdminUserById(
                req.params.id
            );
            if (!adminUser) {
                return res.status(404).json("Người dùng không tồn tại");
            } else {
                return res.status(200).json(adminUser);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE ACCOUNT BY ID
    updateAdminUserById: async (req, res) => {
        try {
            const adminUserId = req.params.id;
            const updateAdminUserData = { ...req.body };

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                updateAdminUserData.password = hashed;
            }

            const affectedRows = await adminUserModel.updateAdminUserById(
                adminUserId,
                updateAdminUserData
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Tài khoản không tồn tại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Cập nhật thành công",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE ACCOUNT BY ID
    deleteAccountById: async (req, res) => {
        try {
            const accountId = req.params.id;
            const affectedRows = await adminUserModel.updateAdminUserById(
                accountId,
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

    deleteAdminUserById: async (req, res) => {
        try {
            const accountId = req.params.id;
            const affectedRows = await adminUserModel.deleteAdminUserById(
                accountId,
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

module.exports = adminUserController;
