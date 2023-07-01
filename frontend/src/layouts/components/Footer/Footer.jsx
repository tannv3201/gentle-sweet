/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import GTextField from "../../../components/GTextField/GTextField";
import { Facebook, Instagram, YouTube, SendRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Footer() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("lg"));
    const [productListClone, setProductListClone] = useState([]);
    const [serviceListClone, setServiceListClone] = useState([]);
    const productList = useSelector(
        (state) => state.product.product?.productList
    );
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    useEffect(() => {
        setProductListClone(structuredClone(productList?.slice(0, 3)));
    }, [productList]);

    useEffect(() => {
        setServiceListClone(structuredClone(serviceList?.slice(0, 3)));
    }, [serviceList]);

    const navigate = useNavigate();

    const handleNavigateToProductDetail = (productId) => {
        navigate(`/san-pham/${productId}`);
    };
    const handleNavigateToProductList = (productId) => {
        navigate(`/san-pham`);
    };

    const handleNavigateToServiceDetail = (productId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${productId}`);
    };
    const handleNavigateToServiceList = (productId) => {
        navigate(`/danh-muc-dich-vu`);
    };

    const handleNavigateToPolicy = () => {
        navigate(`/chinh-sach`);
    };

    return (
        <>
            <div className={cx("home-footer-wrapper")}>
                <div className={cx("home-footer-inner")}>
                    <Grid container spacing={3}>
                        {!isSmall && (
                            <Grid
                                item
                                lg={4}
                                md={6}
                                className={cx("store-wrapper")}
                            >
                                <div className={cx("store-img")}>
                                    <img src={images.logo_footer} alt="" />
                                </div>
                                <div className={cx("store-find")}>
                                    <a
                                        href="#"
                                        className={cx("store-find-btn")}
                                    >
                                        Tìm cửa hàng
                                    </a>
                                </div>
                            </Grid>
                        )}
                        <Grid
                            container
                            item
                            lg={8}
                            md={6}
                            sm={12}
                            xs={12}
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <span
                                    onClick={handleNavigateToProductList}
                                    className={cx("component-title")}
                                >
                                    <h4>Sản phẩm</h4>
                                </span>
                                <ul className={cx("list-of-component")}>
                                    {productListClone?.map((product, idx) => (
                                        <li
                                            key={product?.id}
                                            onClick={() =>
                                                handleNavigateToProductDetail(
                                                    product?.id
                                                )
                                            }
                                            className={cx("item-of-component")}
                                        >
                                            <span href="#">
                                                {product?.name}
                                            </span>
                                        </li>
                                    ))}
                                    <li
                                        onClick={handleNavigateToProductList}
                                        className={cx("item-of-component")}
                                    >
                                        <span href="#">Khác</span>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <span
                                    onClick={handleNavigateToServiceList}
                                    className={cx("component-title")}
                                >
                                    <h4>Dịch vụ</h4>
                                </span>
                                <ul className={cx("list-of-component")}>
                                    {serviceListClone?.map((service, idx) => (
                                        <li
                                            key={service?.id}
                                            onClick={() =>
                                                handleNavigateToServiceDetail(
                                                    service?.id
                                                )
                                            }
                                            className={cx("item-of-component")}
                                        >
                                            <span href="#">
                                                {service?.name}
                                            </span>
                                        </li>
                                    ))}
                                    <li
                                        onClick={handleNavigateToServiceList}
                                        className={cx("item-of-component")}
                                    >
                                        <span href="#">Khác</span>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <span className={cx("component-title")}>
                                    <h4>Hỗ trợ</h4>
                                </span>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <span>FAQs</span>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <span>Bảo mật thông tin</span>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <span onClick={handleNavigateToPolicy}>
                                            Chính sách chung
                                        </span>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <span>Tra cứu đơn hàng</span>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <span className={cx("component-title")}>
                                    <h4>Liên hệ</h4>
                                </span>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <span>Email góp ý</span>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <span>Hotline</span>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <span>0399 859 634</span>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <span className={cx("component-title")}>
                                    <h4>SOCIAL</h4>
                                </span>
                                <div className={cx("social-list")}>
                                    <a
                                        href="https://www.facebook.com/nheoSoSweet/"
                                        target="_blank"
                                    >
                                        <Facebook
                                            className={cx("social-item")}
                                        />
                                    </a>
                                    <a href="#">
                                        <Instagram
                                            className={cx("social-item")}
                                        />
                                    </a>
                                    <a href="#">
                                        <YouTube
                                            className={cx("social-item")}
                                        />
                                    </a>
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                md={6}
                                sm={6}
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <div className={cx("logo")}>
                                    <img src={images.logo_in_dark} alt="" />
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={12}
                                sm={12}
                                xs={12}
                                className={cx("footer-component")}
                            >
                                {/* <a className={cx("component-title")}>
                                    <h4>Đăng ký nhận Mail</h4>
                                </a> */}
                                <div className={cx("receive-mail")}>
                                    <GTextField
                                        placeholder={"Nhập email của bạn..."}
                                        iconButtonSize={
                                            isSmall ? "large" : "small"
                                        }
                                        className={cx("receive-mail-input")}
                                        label="Đăng ký nhận Mail"
                                        iconButtonEnd={
                                            <SendRounded
                                                className={cx(
                                                    "receive-mail-icon"
                                                )}
                                                fontSize={"large"}
                                            />
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={cx("copy-right")}>
                <span>Copyright © 2023 GentleSweet. All rights reserved.</span>
            </div>
        </>
    );
}

export default Footer;
