const RoleModel = require("../models/Role");

const { v4: uuidv4 } = require("uuid");

const roleController = {
    // GET ALL ROLE
    getAllRole: async (req, res) => {
        try {
            const roles = await RoleModel.getAllRole();
            return res.status(200).json(roles);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET ROLE BY ID
    getRoleById: async (req, res) => {
        try {
            const role = await RoleModel.getRoleById(req.params.id);
            if (!role) {
                return res.status(404).json("Role không tồn tại");
            } else {
                return res.status(200).json(role);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createRole: async (req, res, next) => {
        try {
            const newRole = await RoleModel.createRole({
                name: req.body.name,
                description: req.body.description,
                status: 1,
            });
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE ROLE BY ID
    updateRoleById: async (req, res) => {
        try {
            const roleId = req.params.id;
            const affectedRows = await RoleModel.updateProductById(
                roleId,
                req.body
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
};

module.exports = roleController;
