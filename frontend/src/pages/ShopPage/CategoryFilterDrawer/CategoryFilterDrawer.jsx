import React from "react";
import styles from "./CategoryFilterDrawer.module.scss";
import classNames from "classnames/bind";
import GDrawer from "../../../common/GDrawer/GDrawer";
import { FilterGroupList } from "../FilterGroup/FilterGroup";
import { IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import ProductCategory from "../ProductCategory/ProductCategory";

const cx = classNames.bind(styles);

export const CategoryDrawer = ({ onOpen, onClose, open }) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <GDrawer
                    anchor={"left"}
                    onClose={onClose}
                    onOpen={onOpen}
                    open={open}
                >
                    <>
                        <div className={cx("drawer-wrapper-header")}>
                            <h2>Danh mục</h2>
                            <IconButton
                                size="large"
                                onClick={onClose}
                                style={{ marginLeft: "auto" }}
                                className={cx("close-btn")}
                            >
                                <CloseRounded fontSize="large" />
                            </IconButton>
                        </div>
                        <div className={cx("drawer-wrapper")}>
                            <ProductCategory />
                        </div>
                    </>
                </GDrawer>
            </div>
        </div>
    );
};

export const FilterDrawer = ({ onOpen, onClose, open }) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <GDrawer
                    anchor={"right"}
                    onClose={onClose}
                    onOpen={onOpen}
                    open={open}
                >
                    <>
                        <div className={cx("drawer-wrapper-header")}>
                            <IconButton
                                size="large"
                                onClick={onClose}
                                className={cx("close-btn")}
                            >
                                <CloseRounded fontSize="large" />
                            </IconButton>
                            <h2>Bộ lọc</h2>
                        </div>
                        <div className={cx("drawer-wrapper")}>
                            <FilterGroupList />
                        </div>
                    </>
                </GDrawer>
            </div>
        </div>
    );
};
