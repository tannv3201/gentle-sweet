import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCollection from "./HomeCollection/HomeCollection";
import PhotoModel from "./PhotoModel/PhotoModel";
import ServiceList from "./ServiceList/ServiceList";
import HomeBlog from "./HomeBlog/HomeBlog";

import OutstandingService from "./OutstandingService/OutstandingService";
import Advantage from "./Strengths/Strengths";

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <HomeBanner />
            <OutstandingService />
            <Advantage />
            <PhotoModel />
            <ServiceList />
            <HomeBlog />
        </div>
    );
}

export default HomePage;
