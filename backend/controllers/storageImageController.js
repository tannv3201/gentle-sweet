const path = require("path");
const imageFolder = path.join(__dirname, "..", "Images");

const storageImageController = {
    getImageByPathName: async (req, res) => {
        const pathname = req.params?.pathname.replace(/\\/g, "/");
        const imagePath = path.join(imageFolder, pathname);
        res.sendFile(imagePath);
    },
};

module.exports = storageImageController;
