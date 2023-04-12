import React, { memo } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InfoSaleSlider from "./InfoSaleSlider/InforSaleSlider";
import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

const cx = classNames.bind(styles);

const Navbar = memo(() => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('xl'));
    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));

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
