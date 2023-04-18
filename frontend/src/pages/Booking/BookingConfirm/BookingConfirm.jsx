import React from "react";
import classNames from "classnames/bind";
import styles from "./BookingConfirm.module.scss";

const cx = classNames.bind(styles);

function BookingConfirm() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>Booking confirm</div>
        </div>
    );
}

export default BookingConfirm;
