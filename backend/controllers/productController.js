const ProductModel = require("../models/Product");

const { v4: uuidv4 } = require("uuid");

const productsController = {
    productSearch: async (req, res) => {
        try {
            const {
                product_category_id,
                limit,
                sort_by,
                min_price,
                max_price,
            } = req.query;

            const params = {};
            if (product_category_id)
                params.product_category_id = product_category_id;
            if (limit) params.limit = limit;
            if (sort_by) params.sort_by = sort_by;
            if (min_price) params.min_price = min_price;
            if (max_price) params.max_price = max_price;

            const products = await ProductModel.productSearch(params);
            if (!products) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(products);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

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

    // Create Product Online
    createProductOnline: async (req, res, next) => {
        try {
            const newProduct = await ProductModel.createProduct({
                product_category_id: req.body.product_category_id,
                admin_user_id: req.user.id,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image_url: req.body.image_url,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm sản phẩm thành công",
                data: newProduct,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Online
    createProductLocal: async (req, res, next) => {
        try {
            const newProduct = await ProductModel.createProduct({
                product_category_id: req.body.product_category_id,
                admin_user_id: req.user.id,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image_url: req?.file?.filename,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm sản phẩm thành công",
                data: newProduct,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addDiscount: async (req, res) => {
        try {
            const product_id = req.params.id;
            const { discount_id, price_onsale, ...data } = req.body;

            const affectedRows = await ProductModel.updateProductById(
                product_id,
                {
                    discount_id: discount_id,
                    price_onsale: price_onsale,
                }
            );
            if (affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Thêm giảm giá thất bại" });
            } else {
                if (discount_id) {
                    return res.json({
                        status: 200,
                        msg: "Thêm chương trình giảm giá thành công",
                    });
                } else {
                    return res.json({
                        status: 200,
                        msg: "Xóa chương trình giảm giá thành công",
                    });
                }
            }
        } catch (error) {}
    },
    // UPDATE PRODUCT BY ID
    updateProductByID: async (req, res) => {
        try {
            const product_id = req.params.id;
            let dataUpdate;
            const { admin_user_id, ...data } = req.body;
            if (req.file) {
                dataUpdate = { ...data, image_url: req?.file?.filename };
            } else {
                dataUpdate = data;
            }
            const affectedRows = await ProductModel.updateProductById(
                product_id,
                dataUpdate
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
    deleteProductById: async (req, res) => {
        try {
            const product_id = req.params.id;
            const affectedRows = await ProductModel.updateProductById(
                product_id,
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

module.exports = productsController;
