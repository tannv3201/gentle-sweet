/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import GTextField, {
    RedditTextField,
} from "../../../../components/GTextField/GTextField";
import classNames from "classnames/bind";
import styles from "./StepperService.module.scss";
import { Grid, IconButton } from "@mui/material";
import images from "../../../../assets/images";
import GAutocomplete from "../../../../components/GAutocomplete/GAutocomplete";
import GRating from "../../../../components/GRating/GRating";
import CloseIcon from "@mui/icons-material/Close";
import GDatePicker from "../../../../components/GDatePicker/GDatePicker";
import GTextArea from "../../../../components/Form/GTextArea";
import { useState } from "react";
import { useEffect } from "react";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import GModal from "../../../../common/GModal/GModal";
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

export default function StepperService() {
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
                            <h2>Thông tin dịch vụ</h2>
                        </span>
                        <span className={cx("service-sub-title")}>
                            <p>
                                Vui lòng điền đầy đủ thông tin về dịch vụ mà bạn
                                muốn đặt nhé!
                            </p>
                        </span>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            label="Chọn loại dịch vụ"
                            fullWidth
                            variant="filled"
                            data={serviceCategory}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            label="Chọn dịch vụ"
                            fullWidth
                            variant="filled"
                            data={services}
                            onChange={handleSelectService}
                        />
                    </Grid>

                    {Object.keys(selectedService).length > 0 && (
                        <Grid item xs={12}>
                            <div className={cx("selected-service")}>
                                <div className={cx("selected-service-img")}>
                                    <img src={images.service_2} alt="" />
                                </div>
                                <div className={cx("selected-service-content")}>
                                    <div className={cx("content-header")}>
                                        <span
                                            className={cx("service-category")}
                                        >
                                            Nails
                                        </span>
                                        <IconButton>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <span className={cx("service-title")}>
                                        <h3>{selectedService?.name}</h3>
                                    </span>
                                    <span className={cx("service-price")}>
                                        {FormatCurrency(selectedService?.price)}
                                    </span>
                                    <GRating />
                                </div>
                            </div>
                        </Grid>
                    )}
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            label="Chọn khu vực"
                            fullWidth
                            variant="filled"
                            data={provinces}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            label="Chọn cơ sở"
                            fullWidth
                            variant="filled"
                            data={provinces}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GDatePicker label="Chọn ngày" fullWidth />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            label="Chọn khung thời gian"
                            fullWidth
                            variant="filled"
                            data={timeDistance}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <GTextArea label="Ghi chú" /> */}
                        <RedditTextField
                            label="Ghi chú"
                            multiline
                            rows={3}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={cx("note")}>
                                        <span className={cx("note-title")}>
                                            Lưu ý{" "}
                                            <span
                                                style={{
                                                    color: "red",
                                                    fontSize: "1.6rem",
                                                }}
                                            >
                                                *
                                            </span>
                                        </span>
                                        <div className={cx("note-description")}>
                                            <ol>
                                                <li>
                                                    Quý khách hàng vui lòng kiểm
                                                    tra đầy đủ thông tin cá
                                                    nhân, thông tin dịch vụ muốn
                                                    đặt.
                                                </li>
                                                <li>
                                                    Yêu cầu quý khách hàng tuân
                                                    thủ chính sách đặt/hủy lịch
                                                    của chúng tôi. <br />
                                                    <a
                                                        className={cx(
                                                            "polycies-guidelines-link"
                                                        )}
                                                        onClick={
                                                            handleOpenModal
                                                        }
                                                    >
                                                        Chi tiết xem tại đây.
                                                    </a>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
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
