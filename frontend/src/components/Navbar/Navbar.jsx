import React, { useState, memo, useCallback } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid, IconButton } from "@material-ui/core";
import MenuItem from "./MenuItem";
import NavbarActionTop from "./NavbarActionTop/NavbarActionTop";
import MyTextField from "../MyTextField/MyTextField";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
    ReorderRounded,
    CloseRounded,
    SearchRounded,
    ShoppingCartRounded,
    PersonRounded,
    ExpandMore,
    PhoneInTalkRounded,
    HeadsetMicRounded,
    DateRangeRounded,
} from "@material-ui/icons";

import InfoSaleSlider from "./InfoSaleSlider/InforSaleSlider";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const cx = classNames.bind(styles);

const Navbar = memo(() => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className={cx("wrapper")}>
            {/* <NavbarActionTop /> */}
            {!isMedium && <NavbarDesktop />}
            {isMedium && <NavbarMobile />}
            {!isSmall && <InfoSaleSlider />}
        </div>
    );
});

export default Navbar;
