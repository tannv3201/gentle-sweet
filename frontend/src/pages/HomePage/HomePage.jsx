import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCollection from "./HomeCollection/HomeCollection";

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <HomeBanner />
            <HomeCollection />
        </div>
    );
}

export default HomePage;
