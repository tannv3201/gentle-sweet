import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Grid } from "@mui/material";
import GProgress from "../../../components/GProgress/GProgress";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "../../../common/ProductCard/ProductCard";
import GPagination from "../../../common/GPagination/GPagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllProductCategoryCustomer } from "../../../redux/api/apiProductCategory";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";
import { getProductLimit } from "../../../redux/api/apiProduct";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentPage } from "../../../redux/api/apiPagination";

const cx = classNames.bind(styles);

function ProductList() {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
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

    const getProductList = useSelector(
        (state) => state.product.product?.productList
    );
    // useEffect(() => {
    //     if (getProductList) {
    //         const currentPageData = getCurrentPage(getProductList, 1, 8);
    //         setProductList(structuredClone(currentPageData));
    //         console.log("1", currentPageData);
    //     }
    // }, [getProductList]);
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchPage, setSearchPage] = useState(
        searchParams.get("page") || null
    );

    const [page, setPage] = useState(1);
    useEffect(() => {
        const currentPageData = getCurrentPage(getProductList, page, 8);
        setProductList(currentPageData);
    }, [page]);

    console.log("re-render");

    useEffect(() => {
        if (location.search) {
            const currentPageData = getCurrentPage(
                getProductList,
                searchPage,
                8
            );
            setProductList(structuredClone(currentPageData));
            setPage(parseInt(searchPage));
        } else {
            const currentPageData = getCurrentPage(getProductList, 1, 8);
            setProductList(structuredClone(currentPageData));
        }
    }, [searchPage]);
    const handleNavigateToProductDetail = (productId) => {
        navigate(`/san-pham/${productId}`);
    };
    console.log(page);
    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>
                <ProductSkeleton isLoadingSkeleton={isLoadingSkeleton} />
                <GProgress isLoading={isLoading} />
                <Grid container spacing={3}>
                    {productList?.map((product, index) => (
                        <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                            <ProductCard
                                // boxShadow={true}
                                key={product?.id}
                                imageSrc={`${API_IMAGE_URL}/${product?.image_url}`}
                                categoryName={product?.product_category_name}
                                productName={product?.name}
                                productPrice={product?.price}
                                productSold={20}
                                valueRating={5}
                                onSale={product?.discount_percent}
                                onClick={() =>
                                    handleNavigateToProductDetail(product?.id)
                                }
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <GPagination
                            count={Math.ceil((getProductList?.length + 1) / 12)}
                            setCurrentPage={setPage}
                            currentPage={page}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductList;
