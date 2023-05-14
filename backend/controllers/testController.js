const TestModel = require("../models/Test");

const { v4: uuidv4 } = require("uuid");

const testController = {
    // Create Product Category
    createTest: async (req, res, next) => {
        try {
            const test = await TestModel.createTest({
                id: uuidv4(),
                name: req.body.name,
            });
            res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: test,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = testController;
