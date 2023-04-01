import React from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid, IconButton } from "@material-ui/core";
import MenuItem from "./MenuItem";
import NavbarActionTop from "./NavbarActionTop/NavbarActionTop";
import MyTextField from "../MyTextField/MyTextField";

import {
    SearchRounded,
    ShoppingCartRounded,
    PersonRounded,
} from "@material-ui/icons";
import InfoSaleSlider from "./InfoSaleSlider/InforSaleSlider";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx("wrapper")}>
            {/* <NavbarActionTop /> */}
            <div className={cx("content-inner-navbar")}>
                <Grid container>
                    <Grid item xs={2}>
                        <div className={cx("logo-wrapper")}>
                            <a href="/">
                                <img
                                    className={cx("logo")}
                                    src={images.logo}
                                    alt=""
                                />
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div className={cx("menu-list")}>
                            <MenuItem
                                title={"Móng tay"}
                                to={"/product/all"}
                                menuDropDown={<h2>sanpham</h2>}
                            />
                            <span className={cx("border-between-item")} />
                            <MenuItem
                                title={"Tóc"}
                                to={"/service-list"}
                                menuDropDown={<h2>dich vu</h2>}
                            />
                            <span className={cx("border-between-item")} />
                            <MenuItem title={"Sản phẩm"} to={"/sale-off"} />
                            <span className={cx("border-between-item")} />
                            <MenuItem title={"Gentle Sweet"} to={"/about-us"} />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={cx("action-group")}>
                            <IconButton>
                                <SearchRounded />
                            </IconButton>

                            <IconButton>
                                <ShoppingCartRounded />
                            </IconButton>

                            <IconButton>
                                <PersonRounded />
                            </IconButton>
                            {/* <MyTextField
                                roundedBorder
                                placeholder={"Tìm kiếm..."}
                                buttonSize="small"
                                iconButtonStart={
                                    <SearchRounded fontSize="medium" />
                                }
                            /> */}
                        </div>
                    </Grid>
                </Grid>
            </div>
            <InfoSaleSlider />
        </div>
    );
}

export default Navbar;
