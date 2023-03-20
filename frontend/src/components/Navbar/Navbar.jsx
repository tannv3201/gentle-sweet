import React from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@material-ui/core";

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={3}>
                        <div className={cx("logo-wrapper")}>
                            <img
                                className={cx("logo")}
                                src={images.logo}
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        navbar
                    </Grid>
                    <Grid item xs={3}>
                        tifm kiem
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Navbar;
