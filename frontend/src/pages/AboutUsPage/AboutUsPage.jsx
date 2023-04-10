import React from "react";
import classNames from "classnames/bind";
import styles from "./AboutUsPage.module.scss";

import images from "../../assets/images";
import AboutUsPosts from "./AboutUsPosts/AboutUsPosts";
import Overview from "./Overview/Overview";
import VisionMission from "./VisionMission/VisionMission";
import CoreValues from "./CoreValues/CoreValues";
import Services from "./Services/Services";

const cx = classNames.bind(styles);

function AboutUsPage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("banner-img")}>
                <img src={images.banner_about_us} alt="" />
            </div>
            <Overview />
            <VisionMission />
            <CoreValues />
            <Services />
            <AboutUsPosts />
        </div>
    );
}

export default AboutUsPage;
