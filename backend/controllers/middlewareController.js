const jwt = require("jsonwebtoken");

const middlewareController = {
    // Veriry token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_KEY,
                (err, account) => {
                    if (err) {
                        return res.status(403).json("Token is not valid");
                    }
                    req.account = account;
                    next();
                }
            );
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    // // Verify token and admin:
    // verifyTokenAndAdminAuth: (req, res, next) => {
    //     middlewareController.verifyToken(req, res, () => {
    //         if (req.user.role === "admin") {
    //             next();
    //         } else {
    //             return res
    //                 .status(403)
    //                 .json("You're not allowed to delete other users");
    //         }
    //     });
    // },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.account.role === 3) {
                next();
            } else {
                return res.status(403).json("Bạn không có quyền truy cập");
            }
        });
    },
};

module.exports = middlewareController;
