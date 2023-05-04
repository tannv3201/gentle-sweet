const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const accountRoute = require("./routes/account");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const productCategoryRoute = require("./routes/productCategory");
const productRoute = require("./routes/product");

const serviceCategoryRoute = require("./routes/serviceCategory");
const serviceRoute = require("./routes/service");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = 8080;

app.use("/v1/account", accountRoute);

app.use("/v1/user", userRoute);
app.use("/v1/auth", authRoute);

app.use("/v1/productCategory", productCategoryRoute);
app.use("/v1/product", productRoute);

app.use("/v1/serviceCategory", serviceCategoryRoute);
app.use("/v1/service", serviceRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Authentication
