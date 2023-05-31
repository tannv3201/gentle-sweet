import React, { memo } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InfoSaleSlider from "./InfoSaleSlider/InforSaleSlider";
import NavbarDesktop from "./NavbarDesktop2/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

const Navbar = memo(() => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            {/* <NavbarActionTop /> */}
            {!isMedium && <NavbarDesktop />}
            {isMedium && <NavbarMobile />}
            {/* {!isSmall && <InfoSaleSlider />} */}
        </div>
    );
});

export default Navbar;
