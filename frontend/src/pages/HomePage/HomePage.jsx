import React from "react";

import HomeBanner from "./HomeBanner/HomeBanner";
import PhotoModel from "./PhotoModel/PhotoModel";
import PhotoRealistic from "./PhotoRealistic/PhotoRealistic";
import HomeBlog from "./HomeBlog/HomeBlog";

import OutstandingService from "./OutstandingService/OutstandingService";
import Advantage from "./Strengths/Strengths";
import OutstandingProduct from "./OutstandingProduct/OutstandingProduct";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SalonSystem from "../../common/SalonSystem/SalonSystem";

function HomePage() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("lg"));
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
