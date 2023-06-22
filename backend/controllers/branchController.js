const BranchModel = require("../models/Branch");
const { v4: uuidv4 } = require("uuid");

const branchController = {
    // GET ALL PRODUCT CATEGORIES
    getAllBranch: async (req, res) => {
        try {
            const branchs = await BranchModel.getAllBranch();
            return res.status(200).json(branchs);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT CA BY ID
    getBranchById: async (req, res) => {
        try {
            const branch = await BranchModel.getBranchById(req.params.id);
            if (!branch) {
                return res.status(404).json("Chi nhánh không tồn tại");
            } else {
                return res.status(200).json(branch);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createBranch: async (req, res, next) => {
        try {
            const newBranch = await BranchModel.createBranch({
                name: req.body.name,
                detail_address: req.body.detail_address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                province: req.body.province,
                district: req.body.district,
                ward: req.body.ward,
                status: 1,
            });
            return res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newBranch,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT CA BY ID
    updateBranchByID: async (req, res) => {
        try {
            const branch_id = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await BranchModel.updateBranchById(
                branch_id,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {}
    },

    // DELETE PRODUCT CA BY ID
    // deleteBranchById: async (req, res) => {
    //     try {
    //         const prd_category_id = req.params.id;
    //         const affectedRows = await BranchModel.updateBranchById(
    //             prd_category_id,
    //             {
    //                 status: 0,
    //             }
    //         );
    //         if (affectedRows === 0) {
    //             return res.status(404).json({ message: "Xóa thất bại" });
    //         } else {
    //             return res.json({ status: 200, msg: "Xóa thành công" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
};

module.exports = branchController;
