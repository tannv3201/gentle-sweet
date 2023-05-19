import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
    createAdminUser,
    getAdminUserById,
    updateAdminUser,
} from "../../../redux/api/apiAdminUser";
import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import styles from "./Invoice.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../LocalConstants";

import GButton from "../../../components/MyButton/MyButton";
import { ArrowBackIosNew, ModeEditOutlineRounded } from "@mui/icons-material";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { getAllDiscount } from "../../../redux/api/apiDiscount";
import { getAllServiceCategory } from "../../../redux/api/apiServiceCategory";
import { getServiceById, updateService } from "../../../redux/api/apiService";

const cx = classNames.bind(styles);

export default function CreateInvoice() {
    const { serviceId } = useParams();
    dayjs.extend(utc);
    const [isEditting, setIsEditting] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getService = useSelector((state) => state.service.service?.service);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cloneData, setCloneData] = useState([]);

    const formik = useFormik({
        enableReinitialize: true,
        // initialValues: service,
        // validationSchema: validationSchema,
        onSubmit: async (data) => {},
    });

    const handleBack = () => {
        navigate("/admin/invoice");
    };

    return (
        <>
            <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                Trở lại
            </GButton>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-header")}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={cx("wrapper-left-header")}>
                                <span className={cx("title")}>
                                    THÊM HÓA ĐƠN
                                </span>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                        >
                            {!isEditting ? (
                                <div className={cx("button-list")}>
                                    <GButton
                                        onClick={() => setIsEditting(true)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"success"}
                                    >
                                        Chỉnh sửa
                                    </GButton>
                                </div>
                            ) : (
                                <span className={cx("label-editting")}>
                                    CẬP NHẬT THÔNG TIN
                                </span>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("wrapper-body")}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disabled={!isEditting}
                                    // options={serviceCategoryList}
                                    onBlur={formik.handleBlur}
                                    getOptionLabel={(option) =>
                                        `${option?.name}` || ""
                                    }
                                    onChange={(e, value) => {
                                        // handleChangeServiceCategory(value);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        value === null ||
                                        value === "" ||
                                        option?.id === value?.id
                                    }
                                    value={
                                        (formik.values?.service_category_id && {
                                            id: formik.values
                                                ?.service_category_id,
                                            name: formik.values
                                                ?.service_category_name,
                                        }) ||
                                        null
                                    }
                                    renderInput={(params) => (
                                        <GTextFieldNormal
                                            {...params}
                                            disabled={!isEditting}
                                            name="service_category_id"
                                            fullWidth
                                            label="Danh mục"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Tên sản phẩm"
                                    fullWidth
                                    name="name"
                                    value={formik.values?.name || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Số lượng"
                                    type="number"
                                    fullWidth
                                    name="quantity"
                                    value={formik.values?.quantity || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Giá gốc"
                                    type="number"
                                    fullWidth
                                    name="price"
                                    value={formik.values?.price || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled
                                    onChange={formik.handleChange}
                                    label="Giá sale"
                                    type="number"
                                    fullWidth
                                    name="price_onsale"
                                    value={formik.values?.price_onsale || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Mô tả"
                                    fullWidth
                                    name="description"
                                    value={formik.values?.description || ""}
                                    formik={formik}
                                    multiline
                                    rows={3}
                                />
                            </Grid>

                            {isEditting && (
                                <Grid
                                    item
                                    xs={12}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                >
                                    <div>
                                        <GButton
                                            color={"success"}
                                            type="submit"
                                        >
                                            Lưu
                                        </GButton>
                                        <GButton
                                            style={{ marginLeft: "12px" }}
                                            color="text"
                                            onClick={() => {
                                                formik.resetForm();
                                                setIsEditting(false);
                                            }}
                                        >
                                            Hủy
                                        </GButton>
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </div>
            </div>
        </>
    );
}
