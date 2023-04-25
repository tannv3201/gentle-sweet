const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
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
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                role: req.body.role,
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user?.id,
                role: user?.role,
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
                role: user?.role,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await userModel.findUserByUsername(req.body.username);
            if (!user) {
                return res
                    .status(404)
                    .json(`Người dùng: ${req.body.username} không tồn tại`);
            }
            const vailidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!vailidPassword) {
                return res.status(404).json("Mật khẩu không chính xác");
            }
            if (user && vailidPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokenList.push(refreshToken);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true, //
                    secure: false, // deploy -> true
                    path: "/",
                    sameSite: "strict", // Ngăn chặn tấn công CSRF
                });

                const { password, ...others } = user;

                res.status(200).json({ ...others, accessToken });
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
