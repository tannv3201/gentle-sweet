const ProductCategoryModel = require("../models/ProductCategory");
const { v4: uuidv4 } = require("uuid");

const productCategoriesController = {
    // GET ALL PRODUCT CATEGORIES
    getAllProductCategory: async (req, res) => {
        try {
            const prd_categories =
                await ProductCategoryModel.getAllProductCategory();
            return res.status(200).json(prd_categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT CA BY ID
    getProductCategoryById: async (req, res) => {
        try {
            const prd_category =
                await ProductCategoryModel.getProductCategoryById(
                    req.params.id
                );
            if (!prd_category) {
                return res.status(404).json("Danh mục sản phẩm không tồn tại");
            } else {
                return res.status(200).json(prd_category);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createProductCategory: async (req, res, next) => {
        try {
            const newProductCategory =
                await ProductCategoryModel.createProductCategory({
                    admin_user_id: req.user.id,
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    status: 1,
                });
            return res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newProductCategory,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT CA BY ID
    updateProductCategoryByID: async (req, res) => {
        try {
            const prd_category_id = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows =
                await ProductCategoryModel.updateProductCategoryById(
                    prd_category_id,
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
    deleteProductCategoryById: async (req, res) => {
        try {
            const prd_category_id = req.params.id;
            const affectedRows =
                await ProductCategoryModel.updateProductCategoryById(
                    prd_category_id,
                    {
                        status: 0,
                    }
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

module.exports = productCategoriesController;
