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
    const [countPage, setCountPage] = useState();

    const getProductListSearch = useSelector(
        (state) => state.product.product?.productListSearch
    );

    const getProductList = useSelector(
        (state) => state.product.product?.productList
    );

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    useEffect(() => {
        const currentPageData = getCurrentPage(getProductList, page, 8);
        setProductList(currentPageData);
    }, [page]);

    const [locationProductCategoryId, setLocationProductCategoryId] =
        useState(null);
    const [locationPage, setLocationPage] = useState(null);
    const [locationSort, setLocationSort] = useState(null);
    const [locationMinPrice, setLocationMinPrice] = useState(null);
    const [locationMaxPrice, setLocationMaxPrice] = useState(null);

    useEffect(() => {
        const params = searchParams.toString();
        const paramsObj = Object.fromEntries(searchParams.entries());
        const categoryId = paramsObj.product_category_id;
        const page = paramsObj.page;
        const sort = paramsObj.sort;
        const minPrice = paramsObj.minPrice;
        const maxPrice = paramsObj.maxPrice;

        setLocationPage(page);
        setLocationSort(sort);
        setLocationMinPrice(minPrice);
        setLocationMaxPrice(maxPrice);
        setLocationProductCategoryId(categoryId);
    }, [searchParams]);

    useEffect(() => {
        if (
            locationProductCategoryId ||
            locationSort ||
            locationMinPrice ||
            locationMaxPrice
        ) {
            const currentPageData = getCurrentPage(getProductListSearch, 1, 8);
            setProductList(structuredClone(currentPageData));
            setPage(parseInt(1));
            setCountPage(Math.ceil((getProductListSearch?.length + 1) / 12));
        } else if (locationPage) {
            const currentPageData = getCurrentPage(
                getProductList,
                locationPage,
                8
            );
            setProductList(structuredClone(currentPageData));
            setCountPage(Math.ceil((getProductList?.length + 1) / 12));
            setPage(parseInt(locationPage));
        } else {
            const currentPageData = getCurrentPage(getProductList, 1, 8);
            setProductList(structuredClone(currentPageData));
            setCountPage(Math.ceil((getProductList?.length + 1) / 12));
        }
    }, [
        getProductList,
        getProductListSearch,
        locationProductCategoryId,
        locationSort,
        locationMaxPrice,
        locationMinPrice,
        locationPage,
    ]);

    const handleNavigateToProductDetail = (productId) => {
        navigate(`/san-pham/${productId}`);
    };

    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>
                <ProductSkeleton isLoadingSkeleton={isLoadingSkeleton} />
                <GProgress isLoading={isLoading} />
                <Grid container spacing={3}>
                    {productList?.length > 0 ? (
                        productList?.map((product, index) => (
                            <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                                <ProductCard
                                    // boxShadow={true}
                                    key={product?.id}
                                    imageSrc={
                                        product?.image_url
                                            ? `${API_IMAGE_URL}/${product?.image_url}`
                                            : ""
                                    }
                                    categoryName={
                                        product?.product_category_name
                                    }
                                    productName={product?.name}
                                    productPrice={product?.price}
                                    productSold={20}
                                    valueRating={5}
                                    onSale={product?.discount_percent}
                                    onClick={() =>
                                        handleNavigateToProductDetail(
                                            product?.id
                                        )
                                    }
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <div className={cx("no-product")}>
                                Không có sản phẩm
                            </div>
                        </Grid>
                    )}

                    {productList?.length > 0 && (
                        <Grid item xs={12}>
                            <GPagination
                                count={countPage}
                                setCurrentPage={setPage}
                                currentPage={page}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default ProductList;
