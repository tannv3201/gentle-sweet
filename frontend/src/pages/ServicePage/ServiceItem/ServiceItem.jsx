import React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceItem.module.scss";

const cx = classNames.bind(styles);

function ServiceItem({ imgUrl, name, alt, ...props }) {
    return (
        <div className={cx("wrapper")} {...props}>
            <div className={cx("img")}>
                <img src={imgUrl} alt={alt} />
            </div>
            <div className={cx("info")}>
                <h5 className={cx("name")}>{name}</h5>
                <div className={cx("booking")}>
                    <span>Đặt lịch</span>
                </div>
            </div>
        </div>
    );
}

export default ServiceItem;
