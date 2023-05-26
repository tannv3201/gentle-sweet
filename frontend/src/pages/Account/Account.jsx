import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createAxios } from "../../../../createInstance";

import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import {
//     getDistrict,
//     getDistrictById,
//     getProvince,
//     getProvinceById,
//     getWard,
//     getWardById,
// } from "../../../../redux/api/apiProvince";
// import GButton from "../../../../components/MyButton/MyButton";
import { ArrowBackIosNew, ModeEditOutlineRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import PasswordMenu from "./PasswordMenu/PasswordMenu";
import {
    getCustomerUserById,
    updateCustomerUser,
} from "../../redux/api/apiCustomerUser";
import {
    getDistrict,
    getDistrictById,
    getProvince,
    getProvinceById,
    getWard,
    getWardById,
} from "../../redux/api/apiProvince";
import GButton from "../../components/MyButton/MyButton";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import { API_IMAGE_URL } from "../../LocalConstants";
import GTextFieldNormal from "../../components/GTextField/GTextFieldNormal";
import GDatePicker from "../../components/GDatePicker/GDatePicker";
// import {
//     getCustomerUserById,
//     updateCustomerUser,
// } from "../../../../redux/api/apiCustomerUser";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);
export default function Account() {
    dayjs.extend(utc);
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [isEditting, setIsEditting] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getCustomerUser = useSelector(
        (state) => state.customerUser.customerUser?.customerUser
    );

    const dispatch = useDispatch();
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [cloneData, setCloneData] = useState([]);

    useEffect(() => {
        if (getCustomerUser) {
            setCloneData(structuredClone(getCustomerUser));
        }
    }, [getCustomerUser]);

    const [customerUser, setCustomerUser] = useState({
        id: "",
        role_id: "",
        role_name: "",
        birth_date: "",
        username: "",
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        province: "",
        district: "",
        ward: "",
        detail_address: "",
        password: "",
        confirmPassword: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleUpdateCustomerUser = (customerUser) => {
        updateCustomerUser(
            user?.accessToken,
            dispatch,
            cloneData?.id,
            customerUser,
            axiosJWT
        ).then(() => setIsEditting(false));
    };

    // Validate
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Vui lòng không để trống")
            .min(6, "Tên tài khoản phải có ít nhất 6 kí tự")
            .max(20, "Tên tài khoản tối đa 20 kí tự"),
        first_name: Yup.string().required("Vui lòng không để trống"),
        phone_number: Yup.string()
            .matches(/^\d+$/, "Số điện thoại chỉ bao gồm các ký tự số")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        last_name: Yup.string().required("Vui lòng không để trống"),
        email: Yup.string()
            .email("Vui lòng nhập địa chỉ email hợp lệ")
            .required("Vui lòng không để trống"),
        province: Yup.string().required("Vui lòng không để trống"),
        district: Yup.string().required("Vui lòng không để trống"),
        ward: Yup.string().required("Vui lòng không để trống"),
        detail_address: Yup.string().required("Vui lòng không để trống"),
        birth_date: Yup.date()
            .required("Vui lòng nhập ngày sinh")
            .typeError("Ngày không hợp lệ")
            .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại")
            .min(
                new Date("1900-01-01"),
                "Ngày sinh không được nhỏ hơn 01/01/1900"
            ),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: customerUser,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            const {
                confirmPassword,
                password,
                role_name,
                editState,
                ...restData
            } = data;
            const dataFinal = {
                ...restData,
                birth_date: dayjs
                    .utc(data?.birth_date)
                    .utcOffset("+07:00")
                    .format("YYYY/MM/DD"),
            };
            handleUpdateCustomerUser(dataFinal);
        },
    });

    // State PROVINCE LIST - DISTRICT LIST - WARD LIST
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const getProvinceList = structuredClone(
        useSelector((state) => state.province.province.provinceList)
    );

    // Get province list from API
    useEffect(() => {
        if (getProvinceList?.length === 0) {
            getProvince(dispatch);
        }

        setProvinces(getProvinceList);
    }, []);

    // Fn handle province onChange event
    const handleProvinceChange = (event, value) => {
        setSelectedProvince(value);
        setSelectedDistrict(null);
        setSelectedWard(null);
        formik.setFieldValue("province", value?.province_id);

        if (value) {
            getDistrict(value?.province_id).then((districts) => {
                setDistricts(districts);
            });
        } else {
            setDistricts([]);
            formik.setFieldValue("province", null);
            formik.setFieldValue("district", null);
            formik.setFieldValue("ward", null);
        }
    };

    // Fn handle district onChange event
    const handleDistrictChange = (event, value) => {
        setSelectedDistrict(value);
        setSelectedWard(null);
        formik.setFieldValue("district", value?.district_id);

        if (value) {
            getWard(value?.district_id).then((wards) => {
                setWards(wards);
            });
        } else {
            setWards([]);
            formik.setFieldValue("district", null);
            formik.setFieldValue("ward", null);
        }
    };

    // Fn handle ward onChange event
    const handleChangeWard = (value) => {
        if (value) {
            setSelectedWard(value);
            formik.setFieldValue("ward", value?.ward_id);
        } else {
            formik.setFieldValue("ward", null);
        }
    };

    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        if (cloneData) {
            const provinceSelected = getProvinceById(
                cloneData?.province,
                provinces
            );
            setSelectedProvince(provinceSelected);
            formik.setFieldValue("province", provinceSelected?.province_id);

            // District
            getDistrict(cloneData?.province).then((districtList) => {
                const districtSelected = getDistrictById(
                    cloneData?.district,
                    districtList
                );
                setSelectedDistrict(districtSelected);
                setDistricts(districtList);
                formik.setFieldValue("district", districtSelected?.district_id);
            });

            getWard(cloneData?.district).then((wardList) => {
                const wardSelected = getWardById(cloneData?.ward, wardList);
                setSelectedWard(wardSelected);
                setWards(wardList);
                formik.setFieldValue("ward", wardSelected?.ward_id);
            });
        }
    }, [cloneData]);

    // Fn handle birthdate onChange
    const handleChangeBirthDate = (value) => {
        if (value) {
            formik.setFieldValue("birth_date", value);
        } else {
            formik.setFieldValue("birth_date", null);
        }
        formik.validateField("birth_date");
    };

    useEffect(() => {
        if (cloneData)
            setCustomerUser({
                id: cloneData.id,
                username: cloneData.username,
                last_name: cloneData.last_name,
                first_name: cloneData.first_name,
                phone_number: cloneData?.phone_number,
                province: cloneData?.province,
                district: cloneData?.district,
                ward: cloneData?.ward,
                detail_address: cloneData?.detail_address,
                birth_date: cloneData?.birth_date
                    ? dayjs(cloneData?.birth_date)
                    : null,
                email: cloneData.email,
                password: "",
                confirmPassword: "",
            });
    }, [cloneData]);

    useEffect(() => {
        if (user?.accessToken) {
            getCustomerUserById(
                dispatch,
                user?.id,
                user?.accessToken,
                axiosJWT
            );
        }
    }, [user?.id]);

    return (
        <div className={cx("container")}>
            <div className={cx("inner")}>
                <div className={cx("form")}>
                    <div className={cx("wrapper-header")}>
                        <Grid container spacing={2}>
                            <Grid
                                display={isMedium ? "flex" : ""}
                                justifyContent={isMedium ? "center" : ""}
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <div className={cx("user-avatar")}>
                                    <img
                                        src={`${API_IMAGE_URL}/women.jpg`}
                                        alt=""
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                display={"flex"}
                                justifyContent={
                                    isMedium ? "center" : "flex-end"
                                }
                                alignItems={"center"}
                            >
                                {!isEditting ? (
                                    <div className={cx("button-list")}>
                                        <GButton
                                            onClick={() => setIsEditting(true)}
                                            startIcon={
                                                <ModeEditOutlineRounded />
                                            }
                                            color={"success"}
                                        >
                                            Chỉnh sửa
                                        </GButton>
                                        <PasswordMenu
                                            selectedUser={cloneData}
                                        />
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
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Tên đăng nhập"
                                        fullWidth
                                        name="username"
                                        value={formik.values?.username || ""}
                                        formik={formik}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GDatePicker
                                        disabled={!isEditting}
                                        label={"Ngày sinh"}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        name="birth_date"
                                        onChange={(date) =>
                                            handleChangeBirthDate(date)
                                        }
                                        value={
                                            formik.values?.birth_date || null
                                        }
                                        formik={formik}
                                        error={
                                            formik?.touched?.birth_date &&
                                            Boolean(formik?.errors?.birth_date)
                                        }
                                        helperText={
                                            formik?.touched?.birth_date &&
                                            formik?.errors?.birth_date
                                        }
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Họ"
                                        fullWidth
                                        name="last_name"
                                        value={formik.values?.last_name || ""}
                                        formik={formik}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Tên"
                                        fullWidth
                                        name="first_name"
                                        value={formik.values?.first_name || ""}
                                        formik={formik}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Email"
                                        fullWidth
                                        name="email"
                                        value={formik.values?.email || ""}
                                        formik={formik}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    @
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Số điện thoại"
                                        fullWidth
                                        name="phone_number"
                                        value={
                                            formik.values?.phone_number || ""
                                        }
                                        formik={formik}
                                    />
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}>
                                    <Autocomplete
                                        disabled={!isEditting}
                                        options={provinces}
                                        onBlur={formik.handleBlur}
                                        disableClearable={!isEditting}
                                        disableOpenOnFocus={!isEditting}
                                        getOptionLabel={(option) =>
                                            option.province_name
                                        }
                                        isOptionEqualToValue={(option, value) =>
                                            value?.province_id ===
                                            option?.province_id
                                        }
                                        onChange={handleProvinceChange}
                                        value={selectedProvince || null}
                                        renderInput={(params) => (
                                            <GTextFieldNormal
                                                {...params}
                                                disabled={!isEditting}
                                                label="Tỉnh/Thành phố"
                                                variant="outlined"
                                                name="province"
                                                formik={formik}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}>
                                    <Autocomplete
                                        disabled={!isEditting}
                                        options={districts}
                                        onBlur={formik.handleBlur}
                                        getOptionLabel={(option) =>
                                            option.district_name
                                        }
                                        isOptionEqualToValue={(option, value) =>
                                            value?.district_id ===
                                            option?.district_id
                                        }
                                        onChange={handleDistrictChange}
                                        value={selectedDistrict || null}
                                        renderInput={(params) => (
                                            <GTextFieldNormal
                                                {...params}
                                                disabled={!isEditting}
                                                label="Quận/Huyện"
                                                variant="outlined"
                                                name="district"
                                                formik={formik}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}>
                                    <Autocomplete
                                        disabled={!isEditting}
                                        options={wards}
                                        onBlur={formik.handleBlur}
                                        getOptionLabel={(option) =>
                                            option.ward_name
                                        }
                                        isOptionEqualToValue={(option, value) =>
                                            value?.ward_id === option?.ward_id
                                        }
                                        onChange={(event, value) => {
                                            handleChangeWard(value);
                                        }}
                                        value={selectedWard || null}
                                        renderInput={(params) => (
                                            <GTextFieldNormal
                                                {...params}
                                                disabled={!isEditting}
                                                label="Xã/Phường"
                                                variant="outlined"
                                                name="ward"
                                                formik={formik}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <GTextFieldNormal
                                        disabled={!isEditting}
                                        onChange={formik.handleChange}
                                        label="Địa chỉ chi tiết"
                                        fullWidth
                                        name="detail_address"
                                        value={
                                            formik.values?.detail_address || ""
                                        }
                                        formik={formik}
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
                                            <GButton type="submit">Lưu</GButton>
                                            <GButton
                                                style={{ marginLeft: "12px" }}
                                                color="text"
                                                onClick={() =>
                                                    setIsEditting(false)
                                                }
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
            </div>
        </div>
    );
}
