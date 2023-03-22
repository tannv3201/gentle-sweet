import React from "react";
import classNames from "classnames/bind";
import styles from "./HomeFooter.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
import MyTextField from "../../../components/MyTextField/MyTextField";
import { Facebook, Instagram, YouTube, SendRounded } from "@material-ui/icons";
import LogoText from "../../../assets/images/logo_text.svg";

const cx = classNames.bind(styles);

function HomeFooter() {
    return (
        <>
            <div className={cx("home-footer-wrapper")}>
                <div className={cx("home-footer-inner")}>
                    <Grid container>
                        <Grid item xs={4} className={cx("store-wrapper")}>
                            <div className={cx("store-img")}>
                                <img src={images.logo_footer} alt="" />
                            </div>
                            <div className={cx("store-find")}>
                                <MyButton className={cx("store-find-btn")}>
                                    Tìm cửa hàng
                                </MyButton>
                            </div>
                        </Grid>
                        <Grid container item xs={8}>
                            <Grid
                                item
                                xs={3}
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
                                xs={3}
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
                                xs={3}
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
                                xs={3}
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
                                xs={12}
                                className={cx("footer-component")}
                            >
                                <br />
                            </Grid>
                            <Grid
                                item
                                xs={3}
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
                                xs={3}
                                className={cx("footer-component")}
                            >
                                <a className={cx("component-title")}>
                                    <h4>Đăng ký nhận Mail</h4>
                                </a>
                                <div className={cx("receive-mail")}>
                                    <MyTextField
                                        placeholder={"Enter your email..."}
                                        buttonSize="small"
                                        className={cx("receive-mail-input")}
                                        bgDark
                                        iconButtonEnd={
                                            <SendRounded
                                                className={cx(
                                                    "receive-mail-icon"
                                                )}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                className={cx("footer-component")}
                            >
                                <div className={cx("logo")}>
                                    <img src={images.logo_text} alt="" />
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

export default HomeFooter;
