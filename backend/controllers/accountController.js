const accountModel = require("../models/Account");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const accountController = {
    // GET ALL ACCOUNT
    getlAllAccount: async (req, res) => {
        try {
            const accounts = await accountModel.getAllAccount();
            return res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET ACCOUNT BY ID
    getAccountById: async (req, res) => {
        try {
            const account = await accountModel.getAccountById(req.params.id);
            if (!account) {
                return res.status(404).json("Người dùng không tồn tại");
            } else {
                return res.status(200).json(account);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE ACCOUNT BY ID
    updateAccountById: async (req, res) => {
        try {
            const accountId = req.params.id;
            const updateAccountData = { ...req.body };

            if (req.body.password_hash) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password_hash, salt);
                updateAccountData.password_hash = hashed;
            }

            const affectedRows = await accountModel.updateAccountById(
                accountId,
                updateAccountData
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

    // DELETE ACCOUNT BY ID
    deleteAccountById: async (req, res) => {
        try {
            const accountId = req.params.id;
            const affectedRows = await accountModel.deleteAccountById(
                accountId
            );
            if (affectedRows === 0) {
                res.status(404).json({ message: "Tài khoản không tồn tại" });
            } else {
                res.status(200).json({ message: "Xóa tài khoản thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = accountController;
