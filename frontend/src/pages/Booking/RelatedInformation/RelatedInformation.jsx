import React from "react";
import classNames from "classnames/bind";
import styles from "./RelatedInformation.module.scss";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

function RelatedInformation() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container></Grid>
            </div>
        </div>
    );
}

export default RelatedInformation;
