import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OutstandingProduct.module.scss";
import images from "../../../assets/images";
import { Grid } from "@mui/material";
import { Rating } from "@mui/material";
import { ArrowForwardRounded, FormatQuoteRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import ProductCard from "../../../common/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { getProductLimit } from "../../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { API_IMAGE_URL } from "../../../LocalConstants";
import {
    getAllProductCategory,
    getAllProductCategoryCustomer,
} from "../../../redux/api/apiProductCategory";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";

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

function OutstandingProduct() {
    const dispatch = useDispatch();
    const [productLimit, setProductLimit] = useState([]);
    const [productCategoryList, setProductCategoryList] = useState([]);

    const getProductLimit4 = useSelector(
        (state) => state.product.product?.productListSearchLimit
    );
    const productCategoryListCustomer = useSelector(
        (state) =>
            state.productCategory.productCategory?.productCategoryListCustomer
    );
    const discountListCustomer = useSelector(
        (state) => state.discount.discount?.discountListCustomer
    );

    useEffect(() => {
        if (getProductLimit4) {
            const newProductLimit = getProductLimit4?.map((p) => {
                let getDiscount;
                const getProductCategory = productCategoryListCustomer?.find(
                    (pc) => pc?.id === p?.product_category_id
                );

                if (p?.discount_id) {
                    const discount = discountListCustomer?.find(
                        (d) => d.id === parseInt(p.discount_id)
                    );
                    getDiscount = discount;
                }

                return {
                    ...p,
                    product_category_name: getProductCategory?.name,
                    discount_percent: getDiscount?.discount_percent,
                };
            });

            setProductLimit(structuredClone(newProductLimit));
        }
    }, [getProductLimit4]);

    useEffect(() => {
        const fetch = async () => {
            await getAllProductCategoryCustomer(dispatch);
            await getAllDiscountCustomer(dispatch);

            await getProductLimit(dispatch);
        };
        fetch();
    }, []);

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
                            <FormatQuoteRounded
                                style={{
                                    color: "var(--primary-500)",
                                    transform: "scaleX(-1)",
                                    marginRight: "4px",
                                }}
                            />
                            Khám phá sản phẩm độc đáo của chúng tôi ngay hôm
                            nay!
                            <FormatQuoteRounded
                                style={{
                                    color: "var(--primary-500)",
                                    marginLeft: "4px",
                                }}
                            />
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {productLimit?.map((product, index) => (
                        <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                            <ProductCard
                                // boxShadow={true}
                                key={index}
                                imageSrc={`${API_IMAGE_URL}/${product?.image_url}`}
                                categoryName={product?.product_category_name}
                                productName={product?.name}
                                productPrice={product?.price}
                                productSold={20}
                                valueRating={5}
                                onSale={product?.discount_percent}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={cx("outstanding-product-see-more")}>
                    <NavLink to={"/product/all"} className={cx("see-more-btn")}>
                        <span>Xem thêm</span> <ArrowForwardRounded />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default OutstandingProduct;
