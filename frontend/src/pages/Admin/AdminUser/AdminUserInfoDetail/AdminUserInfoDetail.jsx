import React from "react";
import GModal from "../../../../common/GModal/GModal";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { resetPassword } from "../../../../redux/api/apiAdminUser";
import { Grid } from "@mui/material";
import styles from "./AdminUserInfoDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { useEffect } from "react";
import {
    getDistrict,
    getDistrictById,
    getProvince,
    getProvinceById,
    getWard,
    getWardById,
} from "../../../../redux/api/apiProvince";

const cx = classNames.bind(styles);

export default function AdminUserInfoDetail({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleResetPassword = () => {
        resetPassword(
            dispatch,
            selectedUser.id,
            user?.accessToken,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    useEffect(() => {
        if (selectedUser) {
            getProvince().then((provinces) => {
                const provinceSelected = getProvinceById(
                    selectedUser?.province,
                    provinces
                );
                setSelectedProvince(provinceSelected);
            });

            // District
            getDistrict(selectedUser?.province).then((districtList) => {
                const districtSelected = getDistrictById(
                    selectedUser?.district,
                    districtList
                );
                setSelectedDistrict(districtSelected);
            });

            getWard(selectedUser?.district).then((wardList) => {
                const wardSelected = getWardById(selectedUser?.ward, wardList);
                setSelectedWard(wardSelected);
            });
        }
    }, [selectedUser]);

    return (
        <>
            <GModal
                handleClose={() => {
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Thông tin chi tiết nhân viên"
            >
                <div style={{ minWidth: 600 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className={cx("item-info")}>
                                <Grid container spacing={1}>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Quyền hạn:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.role_name}
                                        </span>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Họ và tên:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.last_name +
                                                " " +
                                                selectedUser?.first_name}
                                        </span>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Email:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.email}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={cx("item-info")}>
                                <Grid container spacing={1}>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Tên tài khoản:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.username}
                                        </span>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Ngày sinh:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {dayjs
                                                .utc(selectedUser?.birth_date)
                                                .utcOffset("+07:00")
                                                .format("DD/MM/YYYY")}
                                        </span>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <label className={cx("label-info")}>
                                            Số điện thoại:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.phone_number}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <label className={cx("label-info")}>
                                            Địa chỉ:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <span className={cx("content-info")}>
                                            {`${selectedWard?.ward_name},  ${selectedDistrict?.district_name}, ${selectedProvince?.province_name}`}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <label className={cx("label-info")}>
                                            Địa chỉ chi tiết:{" "}
                                        </label>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <span className={cx("content-info")}>
                                            {selectedUser?.detail_address}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </GModal>
        </>
    );
}
