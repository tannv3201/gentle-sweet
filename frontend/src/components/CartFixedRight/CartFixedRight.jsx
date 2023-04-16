import React from "react";
import styles from "./CartFixedRight.module.scss";
import classnames from "classnames/bind";
import { LocalMallRounded } from "@mui/icons-material";
import { LightTooltip } from "../MyTooltip/MyTooltip";

const cx = classnames.bind(styles);

function CartFixedRight() {
    return (
        <LightTooltip title="Giỏ hàng" placement="left">
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <div className={cx("quantity-wrapper")}>
                        <span className={cx("quantity")}>2</span>
                    </div>
                    <div className={cx("icon-wrapper")}>
                        <LocalMallRounded className={cx("icon")} />
                    </div>
                </div>
            </div>
        </LightTooltip>
    );
}

export default CartFixedRight;
