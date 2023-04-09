import React, { memo } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";

import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

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
