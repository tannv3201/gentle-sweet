import React, { useEffect } from "react";

import HomeBanner from "./HomeBanner/HomeBanner";
import PhotoModel from "./PhotoModel/PhotoModel";
import PhotoRealistic from "./PhotoRealistic/PhotoRealistic";
import HomeBlog from "./HomeBlog/HomeBlog";

import OutstandingService from "./OutstandingService/OutstandingService";
import Advantage from "./Strengths/Strengths";
import OutstandingProduct from "./OutstandingProduct/OutstandingProduct";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SalonSystem from "../../components/SalonSystem/SalonSystem";
import { getAllProduct } from "../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { provinceApi } from "../../redux/api/apiProvinceOpenAPI";
import { getAllBranch } from "../../redux/api/apiBranch";

function HomePage() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("lg"));
    const dispatch = useDispatch();
    useEffect(() => {
        const fetch = async () => {
            await getAllProduct(null, dispatch, null);
            await provinceApi(dispatch);
            await getAllBranch(dispatch);
        };
        fetch();
    }, []);
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
