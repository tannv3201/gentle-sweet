const userModel = require("../models/Users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const userController = {
    // GET ALL USER
    getlAllUser: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET USER BY ID
    getUserById: async (req, res) => {
        try {
            const user = await userModel.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json("Người dùng không tồn tại");
            } else {
                return res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE USER BY ID
    updateUserByID: async (req, res) => {
        try {
            const userId = req.params.id;
            const updateData = { ...req.body };

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                updateData.password = hashed;
            }

            const affectedRows = await userModel.updateUserById(
                userId,
                updateData
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Người dùng không tồn tại" });
            } else {
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE USER BY ID
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const affectedRows = await userModel.deleteUserById(userId);
            if (affectedRows === 0) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User deleted successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;
