import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../../../components/MyButton/MyButton";
import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../../../common/GModal/GModal";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { createAxios } from "../../../../../createInstance";
import GTextFieldNormal from "../../../../../components/GTextField/GTextFieldNormal";
import GDatePicker from "../../../../../components/GDatePicker/GDatePicker";
import {
    getDistrict,
    getProvince,
    getWard,
} from "../../../../../redux/api/apiProvince";

import { useParams } from "react-router-dom";
import {
    createDelivery,
    getDeliveryByInvoiceId,
} from "../../../../../redux/api/apiDelivery";

const paymentMethodList = [
    {
        id: 1,
        name: "Thanh toán khi nhận hàng",
    },
    {
        id: 2,
        name: "Chuyển khoản ngân hàng",
    },
    {
        id: 3,
        name: "Ví điện tử",
    },
];

export default function UpdateCustomerInfoPopup({
    handleOpen,
    isOpen,
    ...props
}) {
    const { invoiceId } = useParams();
    // Get logged user
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    // Initial Formik state
    const [customerUser, setCustomerUser] = useState({
        customer_name: "",
        customer_phone: "",
        province: "",
        district: "",
        ward: "",
        detail_address: "",
        payment_method: "",
    });

    // Create Axios JWT -> Check token & refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Validation formik
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validationSchema = Yup.object().shape({
        customer_name: Yup.string().required("Vui lòng không để trống"),
        customer_phone: Yup.string()
            .matches(/^\d+$/, "Số điện thoại chỉ bao gồm các ký tự số")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        province: Yup.string().required("Vui lòng không để trống"),
        district: Yup.string().required("Vui lòng không để trống"),
        ward: Yup.string().required("Vui lòng không để trống"),
        detail_address: Yup.string().required("Vui lòng không để trống"),
    });

    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: customerUser,
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            await createDelivery(
                user?.accessToken,
                dispatch,
                { ...data, invoice_id: invoiceId },
                axiosJWT
            );
            await getDeliveryByInvoiceId(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
            handleCloseModal();
        },
    });

    // State PROVINCE LIST - DISTRICT LIST - WARD LIST
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // State Selected PROVINCE / DISTRICT /W ARD -> onChange
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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

    const handleChangePaymentMethod = (value) => {
        if (value) {
            setSelectedPaymentMethod(value);
            formik.setFieldValue("payment_method", value?.id);
        } else {
            formik.setFieldValue("payment_method", null);
        }
    };
    // Set selected province/district/ward into states & Formik field

    // Fn handle close modal create/update
    const handleCloseModal = () => {
        formik.resetForm();
        formik.setFieldValue("province", null);
        formik.setFieldValue("district", null);
        formik.setFieldValue("ward", null);
        setSelectedProvince(null);
        setSelectedDistrict(null);
        setSelectedWard(null);
        props.handleClose();
    };

    return (
        <>
            <GModal
                handleClose={handleCloseModal}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Cập nhật thông tin khách hàng"}
            >
                <div style={{ width: 800 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Họ và tên"
                                    fullWidth
                                    name="customer_name"
                                    value={formik.values?.customer_name || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Số điện thoại"
                                    fullWidth
                                    name="customer_phone"
                                    value={formik.values?.customer_phone || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    options={provinces}
                                    onBlur={formik.handleBlur}
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
                                            label="Tỉnh/Thành phố"
                                            variant="outlined"
                                            name="province"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
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
                                            label="Quận/Huyện"
                                            variant="outlined"
                                            name="district"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
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
                                            label="Xã/Phường"
                                            variant="outlined"
                                            name="ward"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={paymentMethodList}
                                    onBlur={formik.handleBlur}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) =>
                                        value?.id === option?.id
                                    }
                                    onChange={(event, value) => {
                                        handleChangePaymentMethod(value);
                                    }}
                                    value={selectedPaymentMethod || null}
                                    renderInput={(params) => (
                                        <GTextFieldNormal
                                            {...params}
                                            label="Phương thức thanh toán"
                                            variant="outlined"
                                            name="payment_method"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Địa chỉ chi tiết"
                                    fullWidth
                                    name="detail_address"
                                    value={formik.values?.detail_address || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GButton type="submit">Lưu</GButton>
                                <GButton
                                    style={{ marginLeft: "12px" }}
                                    color="text"
                                    onClick={handleCloseModal}
                                >
                                    Hủy
                                </GButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </GModal>
        </>
    );
}
