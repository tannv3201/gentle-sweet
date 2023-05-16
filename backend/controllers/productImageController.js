const ProductImageModel = require("../models/ProductImage");
const path = require("path");
const imageFolder = path.join(__dirname, "..", "Images");
const fs = require("fs");

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
                return res.status(404).json("Hình ảnh không tồn tại");
            } else {
                return res.status(200).json(productImage);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getImageByPathName: async (req, res) => {
        const pathname = req.params?.pathname.replace(/\\/g, "/");
        const imagePath = path.join(imageFolder, pathname);
        res.sendFile(imagePath);
    },

    // GET PRODUCT BY ID
    getProductImageByProductId: async (req, res) => {
        try {
            const productImages =
                await ProductImageModel.getProductImageByProductId(
                    req.params.productId
                );
            if (!productImages) {
                return res.json({
                    status: 404,
                    msg: "Sản phẩm không có hình ảnh",
                });
            } else {
                return res.status(200).json(productImages);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete image in folder
    deleteImageInFolder: async (req, res) => {
        const filename = req.params.filename;

        const imagePath = path.join(imageFolder, filename);

        // Kiểm tra xem tệp ảnh có tồn tại hay không
        if (fs.existsSync(imagePath)) {
            // Xóa tệp ảnh
            fs.unlinkSync(imagePath);
            res.json({ status: 200, msg: "Ảnh đã được xóa thành công." });
        } else {
            res.json({ status: 404, msg: "Không tìm thấy ảnh." });
        }
    },

    // Create Product Image
    createProductImage: async (req, res, next) => {
        try {
            const newProductImage = await ProductImageModel.createProductImage({
                product_id: req.body?.product_id,
                image_url: req?.file?.filename,
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
