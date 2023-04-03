import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCollection from "./HomeCollection/HomeCollection";
import PhotoModel from "./PhotoModel/PhotoModel";
import PhotoRealistic from "./PhotoRealistic/PhotoRealistic";
import HomeBlog from "./HomeBlog/HomeBlog";

import OutstandingService from "./OutstandingService/OutstandingService";
import Advantage from "./Strengths/Strengths";
import SalonSystem from "./SalonSystem/SalonSystem";

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <HomeBanner />
            <OutstandingService />
            <Advantage />
            <PhotoModel />
            <PhotoRealistic />
            <HomeBlog />
            <SalonSystem />
        </div>
    );
}

export default HomePage;
