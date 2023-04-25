const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = 8080;

app.use("/v1/user", userRoute);
app.use("/v1/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Authentication
