const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Đường dẫn đến thư mục uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
