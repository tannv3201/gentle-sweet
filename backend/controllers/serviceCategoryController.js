const ServiceCategory = require("../models/ServiceCategory");
const { v4: uuidv4 } = require("uuid");

const serviceCategoryController = {
    // GET ALL SERVICE CATEGORIES
    getAllServiceCategory: async (req, res) => {
        try {
            const service_categories =
                await ServiceCategory.getAllServiceCategory();
            return res.status(200).json(service_categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET SERVICE CATEGOR BY ID
    getServiceCategoryById: async (req, res) => {
        try {
            const service_category =
                await ServiceCategory.getServiceCategoryById(req.params.id);
            if (!service_category) {
                return res.status(404).json("Danh mục sản phẩm không tồn tại");
            } else {
                return res.status(200).json(service_category);
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
                    user_id: req.account.user_id,
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    status: req.body.status,
                });
            res.status(201).json(newServiceCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE SERVICE CATEGOR BY ID
    updateServiceCategoryById: async (req, res) => {
        try {
            const serviceCategoryId = req.params.id;
            const { user_id, ...data } = req.body;
            const affectedRows = await ServiceCategory.updateServiceCategory(
                serviceCategoryId,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {}
    },

    // DELETE SERVICE CATEGOR BY ID
    deleteServiceCategoryById: async (req, res) => {
        try {
            const serviceCategoryId = req.params.id;
            const affectedRows = await ServiceCategory.deleteServiceCategory(
                serviceCategoryId
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

module.exports = serviceCategoryController;
