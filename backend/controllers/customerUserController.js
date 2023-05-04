const customerUserModel = require("../models/CustomerUser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const customerUserController = {
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
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
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
                return res.status(200).json({ message: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = customerUserController;
