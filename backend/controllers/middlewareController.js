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
                console.log(user);
                next();
            });
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

    verifyTokenAndSystemUserAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (
                req.user.role === "SUPER_ADMIN" ||
                req.user.role === "ADMIN" ||
                req.user.role === "STAFF"
            ) {
                next();
            } else {
                return res.status(403).json("Bạn không có quyền truy cập");
            }
        });
    },

    // SUPEER_ADMIN
    verifyTokenAndSuperAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === "SUPER_ADMIN") {
                next();
            } else {
                return res.status(403).json("Bạn không có quyền truy cập");
            }
        });
    },
};

module.exports = middlewareController;
