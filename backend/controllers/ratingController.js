const RatingModel = require("../models/Rating");

const ratingController = {
    // GET ALL INVOICE
    getAllRating: async (req, res) => {
        try {
            const ratings = await RatingModel.getAllRating();

            return res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getRatingById: async (req, res) => {
        try {
            const rating = await RatingModel.getRatingById(req.params.id);
            if (!rating) {
                return res.status(404).json("Đánh giá không tồn tại");
            } else {
                return res.status(200).json(rating);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getRatingByProductId: async (req, res) => {
        try {
            const rating = await RatingModel.getRatingByProductId(
                req.params.id
            );
            if (!rating) {
                return res.status(404).json("Đánh giá không tồn tại");
            } else {
                return res.status(200).json(rating);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getRatingByServiceId: async (req, res) => {
        try {
            const rating = await RatingModel.getRatingByServiceId(
                req.params.id
            );
            if (!rating) {
                return res.status(404).json("Đánh giá không tồn tại");
            } else {
                return res.status(200).json(rating);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createRating: async (req, res) => {
        try {
            const newRating = await RatingModel.createRating(
                //     {
                //     customer_user_id: req.body.customer_user_id,
                //     product_id: req.body.product_id ? req.body.product_id : null,
                //     service_id: req.body.service_id ? req.body.service_id : null,
                //     comment: req.body.comment,
                //     rating: req.body.rating,
                // }
                req.body
            );

            res.json({
                status: 201,
                msg: "Đánh giá thành công",
                data: newRating,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = ratingController;
