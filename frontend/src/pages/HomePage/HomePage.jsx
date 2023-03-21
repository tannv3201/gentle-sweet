import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <HomeBanner />
        </div>
    );
}

export default HomePage;
