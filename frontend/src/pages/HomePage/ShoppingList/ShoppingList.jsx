import React from "react";
import classNames from "classnames/bind";
import styles from "./ShoppingList.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
const cx = classNames.bind(styles);

function ShoppingList() {
    return (
        <div className={cx("shopping-list-wrapper")}>
            <div className={cx("shopping-list-inner")}>
                <Grid container>
                    <Grid item xs={12} className={cx("shopping-list-title")}>
                        <h2>Danh mục mua hàng</h2>
                    </Grid>
                </Grid>
                <Grid container className={cx("shopping-list")} spacing={3}>
                    <Grid item xs={6} className={cx("shopping-item")}>
                        <div className={cx("shopping-item-wrapper")}>
                            <div className={cx("shopping-item-bg")}>
                                <img src={images.clean_tools_2} alt="" />
                            </div>
                            <div className={cx("shopping-item-group")}>
                                <h3 className={cx("title")} href="#">
                                    Dụng cụ vệ sinh móng
                                </h3>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Dụng cụ làm mềm
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Dụng cụ cắt/dũa
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Giấy/bông
                                </a>
                                <MyButton className={cx("btn-see-all")}>
                                    Xem tất cả
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={cx("shopping-item")}>
                        <div className={cx("shopping-item-wrapper")}>
                            <div className={cx("shopping-item-bg")}>
                                <img src={images.nail_polish_bottle} alt="" />
                            </div>
                            <div className={cx("shopping-item-group")}>
                                <h3 className={cx("title")} href="#">
                                    Dụng cụ trang trí móng
                                </h3>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Sơn móng tay
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Dụng cụ trang trí
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Phụ kiện trang trí
                                </a>
                                <MyButton className={cx("btn-see-all")}>
                                    Xem tất cả
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={cx("shopping-item")}>
                        <div className={cx("shopping-item-wrapper")}>
                            <div className={cx("shopping-item-bg")}>
                                <img src={images.nail_tools_box} alt="" />
                            </div>
                            <div className={cx("shopping-item-group")}>
                                <h3 className={cx("title")} href="#">
                                    Combo dụng cụ làm móng
                                </h3>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Combo dành cho người mới(&lt;
                                    100k)
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Combo tầm trung(&lt; 500k)
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Combo cao cấp(&gt; 1000k)
                                </a>
                                <MyButton className={cx("btn-see-all")}>
                                    Xem tất cả
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={cx("shopping-item")}>
                        <div className={cx("shopping-item-wrapper")}>
                            <div className={cx("shopping-item-bg")}>
                                <img src={images.nail_polish_sticks} alt="" />
                            </div>
                            <div className={cx("shopping-item-group")}>
                                <h3 className={cx("title")} href="#">
                                    Khác
                                </h3>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Sách tập vẽ móng
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Sách/thẻ trưng bày móng
                                </a>
                                <a className={cx("sub")} href="#">
                                    <span>-</span> Giá đỡ móng
                                </a>
                                <MyButton className={cx("btn-see-all")}>
                                    Xem tất cả
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div className={cx("shopping-list-see-more")}>
                    <MyButton className={cx("see-more-btn")}>Xem thêm</MyButton>
                </div>
            </div>
        </div>
    );
}

export default ShoppingList;
