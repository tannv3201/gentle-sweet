import React from "react";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import { Grid } from "@mui/material";
import OverviewBooking from "./OverviewBooking/OverviewBooking";
import RelatedInformation from "./RelatedInformation/RelatedInformation";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function Booking() {
    return (
        <main>
            <div className={cx("booking-banner")}>
                <img src={images.banner_about_us} alt="" />
            </div>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <OverviewBooking />
                        </Grid>

                        <Grid item xs={3}>
                            <RelatedInformation />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </main>
    );
}

export default Booking;
