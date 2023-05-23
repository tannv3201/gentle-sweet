const bcrypt = require("bcrypt");
const adminUserModel = require("../models/AdminUser");
const customerUserModel = require("../models/CustomerUser");
const roleModel = require("../models/Role");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const cartModel = require("../models/Cart");

require("dotenv").config();

let refreshTokens = [];

const authController = {
    // REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newCustomerUser = await customerUserModel.createCustomerUser({
                role_id: 4,
                username: req.body.username,
                password: hashed,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                province: req.body.province,
                district: req.body.district,
                ward: req.body.ward,
                detail_address: req.body.detail_address,
                birth_date: req.body.birth_date,
                email: req.body.email,
                status: 1,
            });

            await cartModel.createCart({
                customer_user_id: newCustomerUser.insertId,
            });

            res.status(201).json(newCustomerUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user?.id,
                role_name: user.role_name,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "20s" }
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user?.id,
                role_name: user.role_name,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const adminUser = await adminUserModel.findAdminUserByUsername(
                req.body.username
            );

            const customerUser =
                await customerUserModel.findCustomerUserByUsername(
                    req.body.username
                );

            let user = null;

            if (adminUser) {
                const role = await roleModel.getRoleById(adminUser?.role_id);
                adminUser.role_name = role.name;
                user = adminUser;
            } else if (customerUser) {
                const role = await roleModel.getRoleById(customerUser?.role_id);
                customerUser.role_name = role.name;
                user = customerUser;
            }
            if (!user) {
                return (
                    res
                        // .status(404)
                        .json({
                            msg: "Tài khoản hoặc mật khẩu không chính xác.",
                            status: 404,
                        })
                );
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return (
                    res
                        // .status(401)
                        .json({
                            msg: "Tài khoản hoặc mật khẩu không chính xác.",
                            status: 401,
                        })
                );
            }

            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);

                refreshTokens.push(refreshToken);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true, //
                    secure: false, // deploy -> true
                    path: "/",
                    sameSite: "strict", // Ngăn chặn tấn công CSRF
                });

                const { password, ...others } = user;
                // res.status(200).json({ ...others, accessToken, status: 200 });
                return res.json({
                    ...others,
                    accessToken,
                    msg: "Đăng nhập thành công",
                    status: 200,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Refresh token
    requestRefreshToken: async (req, res) => {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json("You're not authenticated");
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is valid");
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );

            // Create new accesstoken and refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true, //
                secure: false, // deploy -> true
                path: "/",
                sameSite: "strict", // Ngăn chặn tấn công CSRF
            });

            return res.status(200).json({ accessToken: newAccessToken });
        });
    },

    // Logout
    userLogout: (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );
        return res.json({ status: 200, msg: "Đăng xuất thành công" });
    },
};

module.exports = authController;
