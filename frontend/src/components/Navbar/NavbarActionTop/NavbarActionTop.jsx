import React from "react";
import styles from "./NavbarActionTop.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import {
    ReceiptRounded,
    LocationOnRounded,
    FavoriteRounded,
    PersonRounded,
    ShoppingCartRounded,
} from "@material-ui/icons";

const cx = classNames.bind(styles);

function ActionItem({ icon, label }) {
    return (
        <NavLink className={cx("action-item")}>
            <span className={cx("action-item__icon")}>{icon}</span>
            <span className={cx("action-item__label")}>{label}</span>
        </NavLink>
    );
}

function NavbarActionTop() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <ActionItem
                    icon={<ReceiptRounded />}
                    label={"Tra cứu đơn hàng"}
                />
                <ActionItem
                    icon={<LocationOnRounded />}
                    label={"Tìm cửa hàng"}
                />
                <ActionItem icon={<FavoriteRounded />} label={"Yêu thích"} />
                <ActionItem icon={<PersonRounded />} label={"Đăng nhập"} />
                <ActionItem icon={<ShoppingCartRounded />} label={"Giỏ hàng"} />
            </div>
        </div>
    );
}

export default NavbarActionTop;
