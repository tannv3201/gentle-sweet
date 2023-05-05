const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const roleRoute = require("./routes/role");

const adminUserRoute = require("./routes/adminUser");
const customerUserRoute = require("./routes/customerUser");

const authRoute = require("./routes/auth");

const productCategoryRoute = require("./routes/productCategory");
const productRoute = require("./routes/product");

const serviceCategoryRoute = require("./routes/serviceCategory");
const serviceRoute = require("./routes/service");

const discountRoute = require("./routes/discount");

const invoiceRoute = require("./routes/invoice");
const bookingRoute = require("./routes/booking");

const deliveryRoute = require("./routes/delivery");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = 8080;

app.use("/v1/role", roleRoute);

app.use("/v1/adminUser", adminUserRoute);
app.use("/v1/customerUser", customerUserRoute);

app.use("/v1/auth", authRoute);

app.use("/v1/productCategory", productCategoryRoute);
app.use("/v1/product", productRoute);

app.use("/v1/serviceCategory", serviceCategoryRoute);
app.use("/v1/service", serviceRoute);

app.use("/v1/discount", discountRoute);

app.use("/v1/invoice", invoiceRoute);
app.use("/v1/booking", bookingRoute);

app.use("/v1/delivery", deliveryRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
