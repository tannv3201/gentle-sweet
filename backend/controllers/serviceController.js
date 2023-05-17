const ServiceModel = require("../models/Service");
const { v4: uuidv4 } = require("uuid");

const serviceController = {
    // GET ALL SERVICE
    getAllService: async (req, res) => {
        try {
            const services = await ServiceModel.getAllService();
            return res.status(200).json(services);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET SERVICE BY ID
    getServiceById: async (req, res) => {
        try {
            const service = await ServiceModel.getServiceById(req.params.id);
            if (!service) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(service);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createService: async (req, res) => {
        try {
            const newService = await ServiceModel.createService({
                service_category_id: req.body.service_category_id,
                admin_user_id: req.user.id,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image_url: req?.file?.filename,
                status: 1,
            });
            return res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newService,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE SERVICE BY ID
    updateServiceByID: async (req, res) => {
        try {
            const service_id = req.params.id;
            let dataUpdate;
            const { admin_user_id, ...data } = req.body;
            if (req.file) {
                dataUpdate = { ...data, image_url: req?.file?.filename };
            } else {
                dataUpdate = data;
            }
            const affectedRows = await ServiceModel.updateServiceById(
                service_id,
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

    addDiscount: async (req, res) => {
        try {
            const service_id = req.params.id;
            const { discount_id, price_onsale, ...data } = req.body;

            const affectedRows = await ServiceModel.updateServiceById(
                service_id,
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
                        msg: "Thêm giảm giá thành công",
                    });
                } else {
                    return res.json({
                        status: 200,
                        msg: "Xóa giảm giá thành công",
                    });
                }
            }
        } catch (error) {}
    },

    // DELETE SERVICE BY ID
    deleteServiceById: async (req, res) => {
        try {
            const service_id = req.params.id;
            const affectedRows = await ServiceModel.updateServiceById(
                service_id,
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

module.exports = serviceController;
