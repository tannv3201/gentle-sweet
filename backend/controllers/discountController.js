const DiscountModel = require("../models/Discount");

const { v4: uuidv4 } = require("uuid");

const discountController = {
    // GET ALL DISCOUNT
    getAllDiscount: async (req, res) => {
        try {
            const discounts = await DiscountModel.getAllDiscount();
            return res.status(200).json(discounts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET DISCOUNT BY ID
    getDiscountById: async (req, res) => {
        try {
            const discount = await DiscountModel.getDiscountById(req.params.id);
            if (!discount) {
                return res.status(404).json("Giảm giá không tồn tại");
            } else {
                return res.status(200).json(discount);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createDiscount: async (req, res, next) => {
        try {
            const newDiscount = await DiscountModel.createDiscount({
                admin_user_id: req.user.id,
                name: req.body.name,
                description: req.body.description,
                discount_percent: req.body.discount_percent,
                status: 1,
            });
            res.status(201).json(newDiscount);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE DISCOUNT BY ID
    updateDiscountByID: async (req, res) => {
        try {
            const discountId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await DiscountModel.updateDiscountById(
                discountId,
                data
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

    // DELETE DISCOUNT BY ID
    deleteDiscountById: async (req, res) => {
        try {
            const discountId = req.params.id;
            const affectedRows = await DiscountModel.updateDiscountById(
                discountId,
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
};

module.exports = discountController;
