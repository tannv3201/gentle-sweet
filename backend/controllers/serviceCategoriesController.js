const ServiceCategory = require("../models/ServiceCategories");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const serviceCategoriesController = {
    // GET ALL USER
    getAllServiceCategory: async (req, res) => {
        try {
            const serv_categorys =
                await ServiceCategory.getAllServiceCategory();
            return res.status(200).json(serv_categorys);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET USER BY ID
    getServiceCategoryById: async (req, res) => {
        try {
            const serv_category = await ServiceCategory.getServiceCategoryById(
                req.params.id
            );
            if (!serv_category) {
                return res.status(404).json("Danh mục dịch vụ không tồn tại");
            } else {
                return res.status(200).json(serv_category);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createServiceCategory: async (req, res, next) => {
        try {
            // Create new user
            const newServiceCategory =
                await ServiceCategory.createServiceCategory({
                    id: uuidv4(),
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    status: req.body.status,
                    user_id: req?.user?.id,
                });
            res.status(201).json(newServiceCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE USER BY ID
    updateServiceCategoryByID: async (req, res) => {
        try {
            const serv_category_id = req.params.id;
            const { user_id, ...data } = req.body;
            const affectedRows =
                await ServiceCategory.updateServiceCategoryById(
                    serv_category_id,
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
    deleteServiceCategoryById: async (req, res) => {
        try {
            const serv_category_id = req.params.id;
            const affectedRows =
                await ServiceCategory.deleteServiceCategoryById(
                    serv_category_id
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

module.exports = serviceCategoriesController;
