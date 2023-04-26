const Products = require("../models/Products");
const { v4: uuidv4 } = require("uuid");

const productsController = {
    // GET ALL USER
    getAllProduct: async (req, res) => {
        try {
            const products = await Products.getAllProduct();
            return res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET USER BY ID
    getProductById: async (req, res) => {
        try {
            const product = await Products.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createProduct: async (req, res, next) => {
        try {
            // Create new user
            const newProduct = await Products.createProduct({
                id: uuidv4(),
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                unit: req.body.unit,
                image: req.body.image,
                price: req.body.price,
                status: req.body.status,
                category_id: req.body.category_id,
                user_id: req?.user?.id,
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE USER BY ID
    updateProductByID: async (req, res) => {
        try {
            const product_id = req.params.id;
            const { user_id, ...data } = req.body;
            const affectedRows = await Products.updateProductById(
                product_id,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {}
    },

    // DELETE USER BY ID
    deleteProductById: async (req, res) => {
        try {
            const product_id = req.params.id;
            const affectedRows = await Products.deleteProductById(product_id);
            if (affectedRows === 0) {
                res.status(404).json({ message: "Xóa thất bại" });
            } else {
                res.status(200).json({ message: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = productsController;
