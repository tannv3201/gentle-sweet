const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const productCategoriesRoute = require("./routes/productCategories");
const productsRoute = require("./routes/products");

const serviceCategoriesRoute = require("./routes/serviceCategories");
const servicesRoute = require("./routes/services");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = 8080;

app.use("/v1/user", userRoute);
app.use("/v1/auth", authRoute);

app.use("/v1/productCategories", productCategoriesRoute);
app.use("/v1/products", productsRoute);

app.use("/v1/serviceCategories", serviceCategoriesRoute);
app.use("/v1/services", servicesRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Authentication
