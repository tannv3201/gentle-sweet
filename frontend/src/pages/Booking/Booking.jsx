import React from "react";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import { Grid } from "@mui/material";
// import RelatedInformation from "./RelatedInformation/RelatedInformation";
import images from "../../assets/images";
import StepperBooking from "./StepperBooking/StepperBooking";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BookingConfirm from "./BookingConfirm/BookingConfirm";
const cx = classNames.bind(styles);

function Booking() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <main>
            <div className={cx("booking-banner")}>
                <img src={images.banner_about_us} alt="" />
            </div>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={2}>
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                            <StepperBooking />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <div style={{ height: "100%", width: "100%" }}>
                                <BookingConfirm />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </main>
    );
}

export default Booking;
