import React from "react";
import classNames from "classnames/bind";
import styles from "./OutstandingProduct.module.scss";
import images from "../../../assets/images";
import { Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { ArrowForwardRounded } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const cx = classNames.bind(styles);

const productList = [
    {
        category: "Sơn móng tay",
        name: "Sơn móng tay Golden Rose.",
        price: "30000",
        sold: 3,
        image: images.nail_polish_bottle,
        rating: 3,
    },
    {
        category: "Sơn móng tay",
        name: "Sơn móng tay Golden Rose.",
        price: "30000",
        sold: 3,
        image: images.nail_polish_bottle,
        rating: 5,
    },
    {
        category: "Chăm sóc tóc",
        name: "Dầu gội Extreme",
        price: "150000",
        sold: 10,
        image: images.nail_polish_bottle,
        rating: 3,
    },
    {
        category: "Chăm sóc móng",
        name: "Dưỡng móng Vaseline.",
        price: "75000",
        sold: 1,
        image: images.nail_polish_bottle,
        rating: 4,
    },
];

function ProductItem({
    valueRating,
    imageSrc,
    categoryName,
    productName,
    productPrice,
    productSold,
}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const formatCurrency = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <Grid item lg={3} md={6} sm={6} xs={6}>
            <div className={cx("product-container")}>
                <a href="#" className={cx("product-img")}>
                    <img src={imageSrc} alt="" />
                </a>
                <div className={cx("product-content")}>
                    <div className={cx("product-category")}>
                        <span>{categoryName}</span>
                    </div>
                    <h3 className={cx("product-name")}>
                        <a href="">{productName}</a>
                    </h3>
                    <div className={cx("product-price-container")}>
                        <span className={cx("product-price")}>
                            {formatCurrency(productPrice)}
                        </span>
                    </div>
                    <div className={cx("product-rating-container")}>
                        <div className={cx("product-rating")}>
                            <Rating
                                readOnly
                                value={valueRating}
                                size="small"
                                className={cx("product-rating-star")}
                            />
                        </div>
                        <div className={cx("product-sold")}>
                            Đã bán: {productSold}
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    );
}

function OutstandingProduct() {
    return (
        <div className={cx("outstanding-product-wrapper")}>
            <div className={cx("outstanding-product-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12} className={cx("title")}>
                        <b></b>
                        <h2>Sản phẩm bán chạy</h2>
                        <b></b>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={12}
                        md={12}
                        className={cx("sub-title")}
                    >
                        <p>
                            Gentle Beauty luôn cam kết đem đến cho khách hàng
                            những sản phẩm chất lượng và dịch vụ tốt nhất để
                            giúp họ có được vẻ đẹp tóc và móng hoàn hảo.
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {productList.map((product, index) => (
                        <ProductItem
                            key={index}
                            imageSrc={product?.image}
                            categoryName={product?.category}
                            productName={product?.name}
                            productPrice={product?.price}
                            productSold={product?.sold}
                            valueRating={product?.rating}
                        />
                    ))}
                </Grid>
                <div className={cx("outstanding-product-see-more")}>
                    <a href="#" className={cx("see-more-btn")}>
                        <span>Xem thêm</span> <ArrowForwardRounded />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OutstandingProduct;
