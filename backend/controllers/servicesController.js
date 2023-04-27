const Services = require("../models/Services");
const { v4: uuidv4 } = require("uuid");

const servicesController = {
    // GET ALL USER
    getAllService: async (req, res) => {
        try {
            const services = await Services.getAllService();
            return res.status(200).json(services);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET USER BY ID
    getServiceById: async (req, res) => {
        try {
            const service = await Services.getProductById(req.params.id);
            if (!service) {
                return res.status(404).json("Dịch vụ không tồn tại");
            } else {
                return res.status(200).json(service);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createService: async (req, res, next) => {
        try {
            // Create new user
            const newService = await Services.createService({
                id: uuidv4(),
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                status: req.body.status,
                service_category_id: req.body.service_category_id,
                user_id: req?.user?.id,
            });
            res.status(201).json(newService);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE USER BY ID
    updateServiceByID: async (req, res) => {
        try {
            const service_id = req.params.id;
            const { user_id, ...data } = req.body;
            const affectedRows = await Services.updateServiceById(
                service_id,
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
    deleteServiceById: async (req, res) => {
        try {
            const service_id = req.params.id;
            const affectedRows = await Services.deleteServiceById(service_id);
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

module.exports = servicesController;
