import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductPortfolio.module.scss";
import MenuDropDown from "./MenuDropDown";

const cx = classNames.bind(styles);

function ProductPortfolio() {
    return (
        <div className={cx("product-portfolio-wrapper")}>
            <div className={cx("product-portfolio-inner")}>
                <ul className={cx("nav-tabs")}>
                    <li className={cx("nav-tabs-title", "isActive")}>
                        <h3>
                            <a>TẤT CẢ</a>
                        </h3>
                    </li>
                    <div className={cx("separate-order")} />
                    <li className={cx("nav-tabs-title")}>
                        <h3>
                            <a>DỤNG CỤ</a>
                        </h3>
                    </li>
                    <div className={cx("separate-order")} />

                    <li className={cx("nav-tabs-title")}>
                        <h3>
                            <a>KHÁC</a>
                        </h3>
                    </li>
                </ul>
                <div>
                    <MenuDropDown
                        title="Vệ sinh móng"
                        menuItem1="Dụng cụ làm mềm"
                        menuItem2="Dụng cụ cắt/dũa"
                        menuItem3="Giấy/bông"
                    />
                    <MenuDropDown
                        title="Trang trí móng"
                        menuItem1="Sơn móng tay"
                        menuItem2="Dụng cụ trang trí"
                        menuItem3="Phụ kiện trang trí"
                    />
                    <MenuDropDown
                        title="Combo Tools Box"
                        menuItem1="Combo dành cho người mới"
                        menuItem2="Combo tầm trung"
                        menuItem3="Combo cao cấp"
                    />
                    <MenuDropDown
                        title="Bộ sưu tập"
                        menuItem1="Mùa hè rực rỡ"
                        menuItem2="Thiên nhiên"
                        menuItem3="Động vật"
                    />
                    <MenuDropDown
                        title="Sản phẩm khác"
                        menuItem1="Sách tập vẽ móng"
                        menuItem2="Sách/thẻ trưng bày"
                        menuItem3="Giá đỡ"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPortfolio;
