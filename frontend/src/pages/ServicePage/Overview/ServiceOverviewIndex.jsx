import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ServiceOverviewIndex.module.scss";
import ServiceIntroduce from "./ServiceIntroduce/ServiceIntroduce";
import ServiceList from "./ServiceList/ServiceList";

const cx = classNames.bind(styles);

function ServiceOverviewIndex() {
    useEffect(() => {
        // Thiết lập tiêu đề của trang
        document.title = "Dịch vụ của chúng tôi";
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <ServiceIntroduce />
                <ServiceList />
            </div>
        </div>
    );
}

export default ServiceOverviewIndex;
