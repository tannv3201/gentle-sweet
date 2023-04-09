import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";
import PhotoModel from "./PhotoModel/PhotoModel";
import PhotoRealistic from "./PhotoRealistic/PhotoRealistic";
import HomeBlog from "./HomeBlog/HomeBlog";

import OutstandingService from "./OutstandingService/OutstandingService";
import Advantage from "./Strengths/Strengths";
import SalonSystem from "./SalonSystem/SalonSystem";
import OutstandingProduct from "./OutstandingProduct/OutstandingProduct";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
const cx = classNames.bind(styles);

function HomePage() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <HomeBanner />
            <OutstandingService />
            <Advantage />
            <OutstandingProduct />
            <PhotoModel />
            {!isMedium && <PhotoRealistic />}
            <HomeBlog />
            <SalonSystem />
        </>
    );
}

export default HomePage;
