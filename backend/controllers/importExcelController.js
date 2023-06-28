const ImportExcelModel = require("../models/ImportExcel");
const xlsx = require("xlsx");
const multer = require("multer");

const importExcelController = {
    importExcel: async (req, res, next) => {
        const filePath = req.file.path;
        try {
            const workbook = xlsx.readFile(filePath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            // Import dữ liệu vào cơ sở dữ liệu
            for (const data of jsonData) {
                await ImportExcelModel.createProduct(data);
            }

            res.json({
                status: 200,
                msg: "Dữ liệu đã được import thành công.",
            });
        } catch (error) {
            console.error("Lỗi đọc tệp Excel:", error);
            res.status(500).json({
                msg: "Đã xảy ra lỗi khi đọc tệp Excel.",
            });
        }
    },
};

module.exports = importExcelController;
