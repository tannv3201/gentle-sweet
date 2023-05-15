const multer = require("multer");

const upload = multer({ storage: storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Đường dẫn đến thư mục uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
