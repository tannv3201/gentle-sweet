const DeliveryModel = require("../models/Delivery");

const { v4: uuidv4 } = require("uuid");

const deliveryController = {
    // GET ALL DISCOUNT
    getAllDelivery: async (req, res) => {
        try {
            const deliveries = await DeliveryModel.getAllDelivery();
            return res.status(200).json(deliveries);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET DISCOUNT BY USERID
    getDeliveryByUserId: async (req, res) => {
        try {
            const delivery = await DeliveryModel.getDeliveryByUserId(
                req.params.id
            );
            if (!delivery) {
                return res.status(404).json("Giao hàng không tồn tại");
            } else {
                return res.status(200).json(delivery);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET DISCOUNT BY ID
    getDeliveryById: async (req, res) => {
        try {
            const delivery = await DeliveryModel.getDeliveryById(req.params.id);
            if (!delivery) {
                return res.status(404).json("Giao hàng không tồn tại");
            } else {
                return res.status(200).json(delivery);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createDelivery: async (req, res, next) => {
        try {
            const newDelivery = await DeliveryModel.createDelivery({
                invoice_id: req.body.invoice_id,
                customer_user_id: req.body.customer_user_id,
                province: req.body.province,
                district: req.body.district,
                ward: req.body.ward,
                payment_method: req.body.payment_method,
                detail_address: req.body.detail_address,
                status: 1,
            });
            res.status(201).json(newDelivery);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE DISCOUNT BY ID
    updateDeliveryByID: async (req, res) => {
        try {
            const deliveryId = req.params.id;
            const { invoice_id, ...data } = req.body;
            const affectedRows = await DeliveryModel.updateDeliveryById(
                deliveryId,
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
            const deliveryId = req.params.id;
            const affectedRows = await DeliveryModel.updateDeliveryById(
                deliveryId,
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

module.exports = deliveryController;
