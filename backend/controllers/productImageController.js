const ProductImageModel = require("../models/ProductImage");

const { v4: uuidv4 } = require("uuid");

const productImageController = {
    // GET ALL PRODUCT
    getAllProductImage: async (req, res) => {
        try {
            const productImages = await ProductImageModel.getAllProductImage();
            return res.status(200).json(productImages);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT BY ID
    getProductImageById: async (req, res) => {
        try {
            const productImage = await ProductImageModel.getProductImageById(
                req.params.id
            );
            if (!productImage) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(productImage);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT BY ID
    getProductImageByProductId: async (req, res) => {
        try {
            const productImages =
                await ProductImageModel.getProductImageByProductId(
                    req.params.id
                );
            if (!productImages) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(productImages);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createProductImage: async (req, res, next) => {
        try {
            const newProductImage = await ProductImageModel.createProductImage({
                product_id: req.body.product_id,
                image_url: req.body.image_url,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newProductImage,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT BY ID
    updateProductImageById: async (req, res) => {
        try {
            const product_image_id = req.params.id;
            const { product_id, ...data } = req.body;
            const affectedRows = await ProductImageModel.updateProductImageById(
                product_image_id,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE PRODUCT BY ID
    deleteProductImageById: async (req, res) => {
        try {
            const product_image_id = req.params.id;
            const affectedRows = await ProductImageModel.updateProductImageById(
                product_image_id,
                { status: 0 }
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Xóa thất bại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = productImageController;
