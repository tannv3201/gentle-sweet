import React from "react";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import { Grid } from "@mui/material";
import OverviewBooking from "./OverviewBooking/OverviewBooking";
import RelatedInformation from "./RelatedInformation/RelatedInformation";
import images from "../../assets/images";
import StepperBooking from "./OverviewBooking/StepperBooking/StepperBooking";

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
                        <Grid item xs={3}>
                            <div
                                style={{
                                    backgroundColor: "var(--white)",
                                    height: "300px",
                                }}
                            >
                                a
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <StepperBooking />
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
