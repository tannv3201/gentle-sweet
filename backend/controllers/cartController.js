const CartModel = require("../models/Cart");

const pool = require("../config/database");

const { v4: uuidv4 } = require("uuid");

const cartController = {
    // GET ALL INVOICE
    getAllCart: async (req, res) => {
        try {
            const carts = await CartModel.getAllCart();
            return res.status(200).json(carts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getCartById: async (req, res) => {
        try {
            const cart = await CartModel.getCartById(req.params.id);
            if (!cart) {
                return res.status(404).json("Giỏ hàng không tồn tại");
            } else {
                return res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getCartByUserId: async (req, res) => {
        try {
            const carts = await CartModel.getCartByCustomerUserId(
                req.params.id
            );
            if (!carts) {
                return res.status(404).json("Giỏ hàng không tồn tại");
            } else {
                return res.status(200).json(carts);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createCart: async (req, res) => {
        try {
            const newCart = await CartModel.createCart({
                customer_user_id: req.body.customer_user_id,
                product_id: req.body.product_id,
                product_name: req.body.product_name,
                product_quantity: req.body.product_quantity,
                unit_price: req.body.unit_price,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm giỏ hàng thành công",
                data: newCart,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE BY ID
    updateCartById: async (req, res) => {
        try {
            const cartId = req.params.id;
            const { customer_user_id, ...data } = req.body;
            const affectedRows = await CartModel.updateCartById(cartId, data);
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE INVOICE BY ID
    deleteCartById: async (req, res) => {
        try {
            const cartId = req.params.id;
            const affectedRows = await CartModel.deleteCartById(cartId);
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Xóa thất bại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = cartController;
