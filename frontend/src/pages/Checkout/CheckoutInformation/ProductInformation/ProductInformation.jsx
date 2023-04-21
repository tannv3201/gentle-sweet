/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import classNames from "classnames/bind";
import styles from "./ProductInformation.module.scss";
import { Grid, IconButton } from "@mui/material";
import images from "../../../../assets/images";

import { useState } from "react";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import ModalPolycyGuideline from "./ModalPolycyGuideline/ModalPolycyGuideline";

const cx = classNames.bind(styles);

const provinces = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Thái Bình" },
    { id: 3, name: "Hải Phòng" },
    { id: 4, name: "Nam Định" },
    { id: 5, name: "Nghệ An" },
    { id: 6, name: "Ninh Bình" },
];

const serviceCategory = [
    { id: 1, name: "Dịch vụ nails" },
    { id: 2, name: "Dịch vụ tóc" },
    { id: 3, name: "Dịch vụ khác" },
];

const services = [
    { id: 1, name: "Sơn nhũ mắt mèo", price: 120000 },
    { id: 2, name: "Vệ sinh móng", price: 80000 },
    { id: 3, name: "Đắp gel", price: 60000 },
];

const timeDistance = [
    { id: 1, name: "7:00 - 9:00" },
    { id: 2, name: "9:00 - 11:00" },
    { id: 3, name: "13:00 - 15:00" },
    { id: 4, name: "15:00 - 17:00" },
];

export default function ProductInformation() {
    const [selectedService, setIsSelectedService] = useState({});
    const handleSelectService = (_, value) => {
        if (value === null || value === undefined) {
            setIsSelectedService({});
        } else {
            setIsSelectedService(value);
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={cx("service-selected")}>
                        <span className={cx("service-title")}>
                            <h2>Thông tin sản phẩm</h2>
                        </span>
                        <span className={cx("service-sub-title")}>
                            <p>
                                Vui lòng điền đầy đủ thông tin về dịch vụ mà bạn
                                muốn đặt nhé!
                            </p>
                        </span>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
                <ModalPolycyGuideline
                    isOpen={isOpen}
                    handleClose={handleCloseModal}
                    handleOpen={handleOpenModal}
                />
            </div>
        </div>
    );
}
