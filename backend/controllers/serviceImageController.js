const ServiceImageModel = require("../models/ServiceImage");
const path = require("path");
const imageFolder = path.join(__dirname, "..", "Images");
const fs = require("fs");

const serviceImageController = {
    // GET ALL PRODUCT
    getAllServiceImage: async (req, res) => {
        try {
            const serviceImages = await ServiceImageModel.getAllServiceImage();
            return res.status(200).json(serviceImages);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET PRODUCT BY ID
    getServiceImageById: async (req, res) => {
        try {
            const serviceImage = await ServiceImageModel.getServiceImageById(
                req.params.id
            );
            if (!serviceImage) {
                return res.status(404).json("Hình ảnh không tồn tại");
            } else {
                return res.status(200).json(serviceImage);
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
    getServiceImageByServiceId: async (req, res) => {
        try {
            const serviceImage =
                await ServiceImageModel.getServiceImageByServiceId(
                    req.params.serviceId
                );
            if (!serviceImage) {
                return res.json({
                    status: 404,
                    msg: "Sản phẩm không có hình ảnh",
                });
            } else {
                return res.status(200).json(serviceImage);
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

    // Create Service Image
    createServiceImage: async (req, res, next) => {
        try {
            const newServiceImage = await ServiceImageModel.createServiceImage({
                service_id: req.body?.service_id,
                image_url: req?.file?.filename,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newServiceImage,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE PRODUCT BY ID
    updateServiceImageById: async (req, res) => {
        try {
            const service_image_id = req.params.id;
            const { service_id, ...data } = req.body;
            const affectedRows = await ServiceImageModel.updateServiceImageById(
                service_image_id,
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
    deleteServiceImageById: async (req, res) => {
        try {
            const service_image_id = req.params.id;
            const affectedRows = await ServiceImageModel.updateServiceImageById(
                service_image_id,
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

module.exports = serviceImageController;
