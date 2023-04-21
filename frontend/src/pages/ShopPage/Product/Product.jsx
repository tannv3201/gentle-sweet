import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Grid } from "@mui/material";
import GProgress from "../../../components/GProgress/GProgress";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "../../../common/ProductCard/ProductCard";
import GPagination from "../../../common/GPagination/GPagination";

const cx = classNames.bind(styles);

const categoryList = [
    {
        id: 1,
        title: "Tất cả",
        href: "#",
    },
    {
        id: 2,
        title: "Dưỡng tóc",
        href: "#",
    },
    {
        id: 3,
        title: "Dầu gội",
        href: "#",
    },
    {
        id: 4,
        title: "Dưỡng móng",
        href: "#",
    },
    {
        id: 5,
        title: "dụng cụ làm nails",
        href: "#",
    },
    {
        id: 6,
        title: "Sơn móng",
        href: "#",
    },
];

function Product() {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsLoadingSkeleton(true);
            await axios
                .get(
                    "https://6418546729e7e36438e5a243.mockapi.io/api/v1/products"
                )
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
                    {/* <Grid item xs={12}>
                        <div className={cx("category-list-wrapper")}>
                            <span className={cx("category-list-title")}>
                                <h3>Danh mục:</h3>
                            </span>
                            <div className={cx("category-list")}>
                                {categoryList?.map((category, index) => (
                                    <a
                                        key={index}
                                        href={category?.href}
                                        className={
                                            index === 0 ? cx("isActive") : ""
                                        }
                                    >
                                        {category?.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Grid> */}
                    {productList.map((product, index) => (
                        <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                            <ProductCard
                                href="/product/son-mong-tay"
                                key={index}
                                imageSrc={product?.image}
                                categoryName={product?.category}
                                productName={product?.name}
                                productPrice={product?.price}
                                productSold={product?.sold}
                                valueRating={product?.rating}
                                onSale={product?.onSale}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <GPagination count={10} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Product;
