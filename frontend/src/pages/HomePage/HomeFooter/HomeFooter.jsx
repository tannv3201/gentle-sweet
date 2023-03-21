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
                        <Grid container xs={8}>
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
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                </ul>
                            </Grid>
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
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                </ul>
                            </Grid>
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
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                </ul>
                            </Grid>
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
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
                                    </li>
                                    <li className={cx("item-of-component")}>
                                        <a href="#">Giày nam</a>
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
                                    <h4>ANANAS SOCIAL</h4>
                                </a>
                                <div className={cx("social-list")}>
                                    <a href="#">
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
