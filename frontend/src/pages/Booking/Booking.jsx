import React from "react";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

function Booking() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>booking</div>
        </div>
    );
}

export default Booking;
