import React from "react";
import classNames from "classnames/bind";
import styles from "./ServicePage.module.scss";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import { Grid } from "@material-ui/core";
import NailService from "./NailService/NailService";

const cx = classNames.bind(styles);

function ServicePage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <ServiceOverview />
                <NailService />
            </div>
        </div>
    );
}

export default ServicePage;
