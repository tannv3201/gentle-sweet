import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import GTextField from "../../../components/GTextField/GTextField";
import { Facebook, Instagram, YouTube, SendRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

function Footer() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("lg"));
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
                                <a href="#" className={cx("component-title")}>
                                    <h4>Sản phẩm</h4>
                                </a>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Dụng cụ vệ sinh móng</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Dụng cụ trang trí móng</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Combo tools box</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Khác</a>
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
                                <a href="#" className={cx("component-title")}>
                                    <h4>Dịch vụ</h4>
                                </a>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Cắt và chăm sóc móng</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Sơn - vẽ - đắp gel</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Tháo gen/bột</a>
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
                                <a href="#" className={cx("component-title")}>
                                    <h4>Hỗ trợ</h4>
                                </a>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">FAQs</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Bảo mật thông tin</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Chính sách chung</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Tra cứu đơn hàng</a>
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
                                <a href="#" className={cx("component-title")}>
                                    <h4>Liên hệ</h4>
                                </a>
                                <ul className={cx("list-of-component")}>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Email góp ý</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Hotline</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">0386 653 766</a>
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
                                <a className={cx("component-title")}>
                                    <h4>SOCIAL</h4>
                                </a>
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
