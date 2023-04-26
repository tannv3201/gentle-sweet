const jwt = require("jsonwebtoken");

const middlewareController = {
    // Veriry token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    // Verify token and admin:
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "admin") {
                next();
            } else {
                return res
                    .status(403)
                    .json("You're not allowed to delete other users");
            }
        });
    },
};

module.exports = middlewareController;
