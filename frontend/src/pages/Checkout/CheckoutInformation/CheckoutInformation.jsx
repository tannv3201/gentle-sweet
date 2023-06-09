import React, { useEffect, useState } from "react";
import styles from "./CheckoutInformation.module.scss";
import classNames from "classnames/bind";
import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    TextField,
} from "@mui/material";
import GTextField from "../../../components/GTextField/GTextField";
import GAutocomplete from "../../../components/GAutocomplete/GAutocomplete";
import { useFormik, useFormikContext } from "formik";
import { createAxios } from "../../../createInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import PaymentInformation from "../PaymentInformation/PaymentInformation";
import { getCustomerUserById } from "../../../redux/api/apiCustomerUser";
import {
    districtApi,
    getDistrictById,
    getProvinceById,
    getWardById,
    provinceApi,
    wardApi,
} from "../../../redux/api/apiProvinceOpenAPI";
import RequiredLabelWrapper, {
    RequiredMark,
} from "../../../components/RequiredLabel/RequiredLabel";
const cx = classNames.bind(styles);

function CheckoutInformation() {
    const dispatch = useDispatch();
    const { setFieldValue, values, errors, touched, handleBlur, handleChange } =
        useFormikContext();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getCustomerUser = useSelector(
        (state) => state.customerUser.customerUser?.customerUser
    );

    const [customerUser, setCustomerUser] = useState({});

    useEffect(() => {
        if (user) {
            getCustomerUserById(
                dispatch,
                user?.id,
                user?.accessToken,
                axiosJWT
            );
        }
    }, []);

    const [selectedCurrProvince, setSelectedCurrProvince] = useState(null);
    const [selectedCurrDistrict, setSelectedCurrDistrict] = useState(null);
    const [selectedCurrWard, setSelectedCurrWard] = useState(null);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // State PROVINCE LIST - DISTRICT LIST - WARD LIST
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const getProvinceList = structuredClone(
        useSelector((state) => state.province.province.provinceList)
    );

    // Get province list from API
    useEffect(() => {
        const fetch = async () => {
            if (getProvinceList?.length === 0) {
                provinceApi(dispatch);
            }

            setProvinces(getProvinceList);
        };
        fetch();
    }, []);

    useEffect(() => {
        if (getCustomerUser) setCustomerUser(getCustomerUser);
    }, [getCustomerUser]);

    // Fn handle province onChange event
    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        if (getCustomerUser) {
            const fetch = async () => {
                const provinceSelected = getProvinceById(
                    getCustomerUser?.province,
                    provinces
                );
                setSelectedCurrProvince(provinceSelected);
                // District
                await districtApi(getCustomerUser?.province).then(
                    (districtList) => {
                        const districtSelected = getDistrictById(
                            customerUser?.district,
                            districtList
                        );
                        setSelectedCurrDistrict(districtSelected);
                        setDistricts(districtList);
                    }
                );

                await wardApi(getCustomerUser?.district).then((wardList) => {
                    const wardSelected = getWardById(
                        customerUser?.ward,
                        wardList
                    );
                    setSelectedCurrWard(wardSelected);
                    setWards(wardList);
                });
            };
            fetch();
        }
    }, [customerUser]);

    // Fn handle province onChange event
    const handleProvinceChange = async (event, value) => {
        setSelectedProvince(value);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setFieldValue("province", value?.code);

        if (value) {
            await districtApi(value?.code).then((districts) => {
                setDistricts(districts);
            });
        } else {
            setDistricts([]);
            setFieldValue("province", null);
            setFieldValue("district", null);
            setFieldValue("ward", null);
        }
    };

    // Fn handle district onChange event
    const handleDistrictChange = async (event, value) => {
        setSelectedDistrict(value);
        setSelectedWard(null);
        setFieldValue("district", value?.code);

        if (value) {
            await wardApi(value?.code).then((wards) => {
                setWards(wards);
            });
        } else {
            setWards([]);
            setFieldValue("district", null);
            setFieldValue("ward", null);
        }
    };

    // Fn handle ward onChange event
    const handleChangeWard = (value) => {
        if (value) {
            setSelectedWard(value);
            setFieldValue("ward", value?.code);
        } else {
            setFieldValue("ward", null);
        }
    };
    const handleInfoSame = (e) => {
        if (e.target.checked) {
            setFieldValue(
                "fullName",
                customerUser?.last_name + " " + customerUser?.first_name || ""
            );
            setFieldValue("phone_number", customerUser?.phone_number);
            setSelectedProvince(selectedCurrProvince);
            setSelectedDistrict(selectedCurrDistrict);
            setSelectedWard(selectedCurrWard);
            setFieldValue("province", customerUser?.province);
            setFieldValue("district", customerUser?.district);
            setFieldValue("ward", customerUser?.ward);
            setFieldValue("detail_address", customerUser?.detail_address);
        } else {
            setFieldValue("fullName", "");
            setFieldValue("phone_number", "");
            setSelectedProvince(null);
            setSelectedDistrict(null);
            setSelectedWard(null);
            setFieldValue("province", null);
            setFieldValue("district", null);
            setFieldValue("ward", null);
            setFieldValue("detail_address", "");
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("information")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Thông tin cá nhân</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <GTextFieldNormal
                            disabled
                            value={
                                customerUser?.last_name +
                                    " " +
                                    customerUser?.first_name || ""
                            }
                            label="Họ và tên"
                            fullWidth
                            name="last_name"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GTextFieldNormal
                            disabled
                            value={customerUser?.email || ""}
                            label="Email"
                            fullWidth
                            name="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        @
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GTextFieldNormal
                            disabled
                            value={customerUser?.phone_number || ""}
                            label="Số điện thoại"
                            fullWidth
                            name="phone_number"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            disabled
                            options={provinces}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            value={selectedCurrProvince || null}
                            renderInput={(params) => (
                                <GTextFieldNormal
                                    {...params}
                                    label="Tỉnh/Thành phố"
                                    variant="outlined"
                                    name="province"
                                    disabled
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            disabled
                            options={districts}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            value={selectedCurrDistrict || null}
                            renderInput={(params) => (
                                <GTextFieldNormal
                                    {...params}
                                    label="Quận/Huyện"
                                    variant="outlined"
                                    name="district"
                                    disabled
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={wards}
                            disabled
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            value={selectedCurrWard || null}
                            renderInput={(params) => (
                                <GTextFieldNormal
                                    {...params}
                                    disabled={true}
                                    label="Xã/Phường"
                                    variant="outlined"
                                    name="ward"
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GTextFieldNormal
                            disabled
                            value={customerUser?.detail_address || ""}
                            label="Số nhà, đường"
                            fullWidth
                            name="detail_address"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx("delivery-information")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <RequiredLabelWrapper
                            label={<h3>Thông tin giao hàng</h3>}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={handleInfoSame} />}
                                label="Giống với thông tin cá nhân"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <TextField
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
                            value={values?.fullName || ""}
                            onChange={(e) =>
                                setFieldValue("fullName", e.target.value)
                            }
                            label={
                                <>
                                    Họ và tên <RequiredMark />
                                </>
                            }
                            fullWidth
                            name="fullName"
                            error={
                                touched?.fullName && Boolean(errors?.fullName)
                            }
                            helperText={touched?.fullName && errors?.fullName}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <TextField
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
                            type="number"
                            value={values?.phone_number || ""}
                            onChange={(e) =>
                                setFieldValue("phone_number", e.target.value)
                            }
                            label={
                                <>
                                    Số điện thoại <RequiredMark />
                                </>
                            }
                            fullWidth
                            name="phone_number"
                            error={
                                touched?.phone_number &&
                                Boolean(errors?.phone_number)
                            }
                            helperText={
                                touched?.phone_number && errors?.phone_number
                            }
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={provinces}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            onChange={handleProvinceChange}
                            value={selectedProvince || null}
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    color="secondary"
                                    size="small"
                                    {...params}
                                    label={
                                        <>
                                            Tỉnh/Thành phố <RequiredMark />
                                        </>
                                    }
                                    name="province"
                                    error={
                                        touched?.province &&
                                        Boolean(errors?.province)
                                    }
                                    helperText={
                                        touched?.province && errors?.province
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={districts}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            size="small"
                            onChange={handleDistrictChange}
                            value={selectedDistrict || null}
                            renderInput={(params) => (
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    color="secondary"
                                    size="small"
                                    {...params}
                                    label={
                                        <>
                                            Quận/Huyện <RequiredMark />
                                        </>
                                    }
                                    variant="outlined"
                                    name="district"
                                    error={
                                        touched?.district &&
                                        Boolean(errors?.district)
                                    }
                                    helperText={
                                        touched?.district && errors?.district
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={wards}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                value?.code === option?.code
                            }
                            size="small"
                            onChange={(event, value) => {
                                handleChangeWard(value);
                            }}
                            value={selectedWard || null}
                            renderInput={(params) => (
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    color="secondary"
                                    size="small"
                                    {...params}
                                    label={
                                        <>
                                            Xã/Phường <RequiredMark />
                                        </>
                                    }
                                    variant="outlined"
                                    name="ward"
                                    error={
                                        touched?.ward && Boolean(errors?.ward)
                                    }
                                    helperText={touched?.ward && errors?.ward}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
                            value={values?.detail_address || ""}
                            onChange={(e) =>
                                setFieldValue("detail_address", e.target.value)
                            }
                            label={
                                <>
                                    Số nhà, đường <RequiredMark />
                                </>
                            }
                            fullWidth
                            name="detail_address"
                            error={
                                touched?.detail_address &&
                                Boolean(errors?.detail_address)
                            }
                            helperText={
                                touched?.detail_address &&
                                errors?.detail_address
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GTextFieldNormal
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
                            value={values?.note || ""}
                            onChange={handleChange}
                            label="Ghi chú"
                            fullWidth
                            name="note"
                            multiline
                            rows={2}
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <PaymentInformation />
            </div>
        </div>
    );
}

export default CheckoutInformation;
