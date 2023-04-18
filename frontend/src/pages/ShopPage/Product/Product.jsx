import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { FilterListRounded, ArrowDropDown } from "@mui/icons-material";
import { Grid, MenuItem } from "@mui/material";
import MyTextField from "../../../components/GTextField/MyTextField";
import FilterGroup from "../FilterGroup/FilterGroup";
import GProgress from "../../../components/GProgress/GProgress";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";

const cx = classNames.bind(styles);
function Product() {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsLoadingSkeleton(true);
            await axios
                .get("https://6418546729e7e36438e5a243.mockapi.io/api/v1/nails")
                .then((response) => {
                    setProductList(response.data);
                    setIsLoading(false);
                    setIsLoadingSkeleton(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setIsLoadingSkeleton(false);
                });
        };
        fetchData();
    }, []);

    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>
                <ProductSkeleton isLoadingSkeleton={isLoadingSkeleton} />
                <GProgress isLoading={isLoading} />
                <Grid container spacing={3}>
                    {productList.map((product, index) => (
                        <Grid item xs={3}>
                            <div className={cx("product-item")}>
                                <div className={cx("product-item-img")}>
                                    <img src={product.image} alt="" />
                                </div>
                                <div className={cx("product-item-info")}>
                                    <h3 className={cx("product-name")}>
                                        <a href="#">{product.name}</a>
                                    </h3>
                                    <p className={cx("product-price")}>
                                        <span className={cx("product-price")}>
                                            {product.price}
                                        </span>
                                        <span
                                            className={cx("product-price-del")}
                                        >
                                            30000
                                        </span>
                                    </p>
                                    {product.status === "0" && (
                                        <div className={cx("product-soldout")}>
                                            Tạm hết hàng
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Product;
