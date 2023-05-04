const bcrypt = require("bcrypt");
const accountModel = require("../models/Account");
const userModel = require("../models/Users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

require("dotenv").config();

let refreshTokenList = [];

const authController = {
    // REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await userModel.createUser({
                id: uuidv4(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                province: req.body.province,
                district: req.body.district,
                ward: req.body.ward,
                detail_address: req.body.detail_address,
                birth_date: req.body.birth_date,
                status: 1,
            });

            // Create new user
            const newAccount = await accountModel.createAccount({
                id: uuidv4(),
                user_id: newUser.id,
                role: req.body.role,
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                status: 1,
            });

            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (account) => {
        return jwt.sign(
            {
                account_id: account?.id,
                role: account?.role,
                user_id: account?.user_id,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "20s" }
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (account) => {
        return jwt.sign(
            {
                account_id: account?.id,
                role: account?.role,
                user_id: account?.user_id,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const account = await accountModel.findAccountByUsername(
                req.body.username
            );
            if (!account) {
                return (
                    res
                        // .status(404)
                        .json({
                            error: "Tài khoản hoặc mật khẩu không chính xác.",
                            status: 404,
                        })
                );
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                account.password
            );
            if (!validPassword) {
                return (
                    res
                        // .status(401)
                        .json({
                            error: "Tài khoản hoặc mật khẩu không chính xác.",
                            status: 401,
                        })
                );
            }
            if (account && validPassword) {
                const accessToken = authController.generateAccessToken(account);
                const refreshToken =
                    authController.generateRefreshToken(account);
                refreshTokenList.push(refreshToken);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true, //
                    secure: false, // deploy -> true
                    path: "/",
                    sameSite: "strict", // Ngăn chặn tấn công CSRF
                });

                const { password, ...others } = account;

                res
                    // .status(200)
                    .json({ ...others, accessToken, status: 200 });
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
        if (!refreshTokenList.includes(refreshToken)) {
            return res.status(403).json("Refresh token is valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }

            const refreshTokens = refreshTokenList.filter(
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
        refreshTokenList = refreshTokenList.filter(
            (token) => token !== req.cookies.refreshToken
        );
        return res.status(200).json("Logged out!");
    },
};

module.exports = authController;
