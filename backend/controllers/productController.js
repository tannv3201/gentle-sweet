const ProductModel = require("../models/Product");

const { v4: uuidv4 } = require("uuid");

const productsController = {
    // GET ALL PRODUCT
    getAllProduct: async (req, res) => {
        try {
            const products = await ProductModel.getAllProduct();
            return res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT BY ID
    getProductById: async (req, res) => {
        try {
            const product = await ProductModel.getProductById(req.params.id);
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
            const newProduct = await ProductModel.createProduct({
                id: uuidv4(),
                product_category_id: req.body.product_category_id,
                user_id: req.account.user_id,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image: req.body.image,
                status: 1,
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT BY ID
    updateProductByID: async (req, res) => {
        try {
            const product_id = req.params.id;
            const { user_id, ...data } = req.body;
            const affectedRows = await ProductModel.updateProductById(
                product_id,
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

    // DELETE PRODUCT BY ID
    deleteProductById: async (req, res) => {
        try {
            const product_id = req.params.id;
            const affectedRows = await ProductModel.deleteProductById(
                product_id
            );
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
