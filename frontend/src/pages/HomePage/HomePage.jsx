import React from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCollection from "./HomeCollection/HomeCollection";
import ShoppingList from "./ShoppingList/ShoppingList";
import PhotoModel from "./PhotoModel/PhotoModel";
import ServiceList from "./ServiceList/ServiceList";
import HomeBlog from "./HomeBlog/HomeBlog";

import ScrollBackToTop from "../../components/ScrollBackToTop";

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <HomeBanner />
            <HomeCollection />
            <ShoppingList />
            <PhotoModel />
            <ServiceList />
            <HomeBlog />
        </div>
    );
}

export default HomePage;
