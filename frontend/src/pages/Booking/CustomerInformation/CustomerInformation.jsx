import React, { useEffect, useState } from "react";
import styles from "./CustomerInformation.module.scss";
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

import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { getCustomerUserById } from "../../../redux/api/apiCustomerUser";
import {
    districtApi,
    getDistrictById,
    getProvinceById,
    getWardById,
    wardApi,
} from "../../../redux/api/apiProvinceOpenAPI";
const cx = classNames.bind(styles);

function CustomerInformation() {
    const dispatch = useDispatch();
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
        setProvinces(getProvinceList);
    }, []);

    useEffect(() => {
        if (getCustomerUser) setCustomerUser(getCustomerUser);
    }, [getCustomerUser]);

    // Fn handle province onChange event

    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        const fetch = async () => {
            if (getCustomerUser) {
                const provinceSelected = await getProvinceById(
                    getCustomerUser?.province,
                    provinces
                );
                setSelectedCurrProvince(provinceSelected);

                // District
                await districtApi(getCustomerUser?.province).then(
                    (districtList) => {
                        const districtSelected = getDistrictById(
                            getCustomerUser?.district,
                            districtList
                        );
                        setSelectedCurrDistrict(districtSelected);

                        // setDistricts(districtList);
                    }
                );

                await wardApi(getCustomerUser?.district).then((wardList) => {
                    const wardSelected = getWardById(
                        getCustomerUser?.ward,
                        wardList
                    );
                    setSelectedCurrWard(wardSelected);
                    // setWards(wardList);
                });
            }
        };
        fetch();
    }, [getCustomerUser]);

    // // Fn handle province onChange event
    // const handleProvinceChange = (event, value) => {
    //     setSelectedProvince(value);
    //     setSelectedDistrict(null);
    //     setSelectedWard(null);
    //     setFieldValue("province", value?.code);

    //     if (value) {
    //         getDistrict(value?.code).then((districts) => {
    //             setDistricts(districts);
    //         });
    //     } else {
    //         setDistricts([]);
    //         setFieldValue("province", null);
    //         setFieldValue("district", null);
    //         setFieldValue("ward", null);
    //     }
    // };

    // // Fn handle district onChange event
    // const handleDistrictChange = (event, value) => {
    //     setSelectedDistrict(value);
    //     setSelectedWard(null);
    //     setFieldValue("district", value?.code);

    //     if (value) {
    //         getWard(value?.code).then((wards) => {
    //             setWards(wards);
    //         });
    //     } else {
    //         setWards([]);
    //         setFieldValue("district", null);
    //         setFieldValue("ward", null);
    //     }
    // };

    // // Fn handle ward onChange event
    // const handleChangeWard = (value) => {
    //     if (value) {
    //         setSelectedWard(value);
    //         setFieldValue("ward", value?.code);
    //     } else {
    //         setFieldValue("ward", null);
    //     }
    // };

    // const handleInfoSame = (e) => {
    //     if (e.target.checked) {
    //         setFieldValue(
    //             "fullName",
    //             customerUser?.last_name + " " + customerUser?.first_name || ""
    //         );
    //         setFieldValue("phone_number", customerUser?.phone_number || "");
    //         setSelectedProvince(selectedCurrProvince);
    //         setSelectedDistrict(selectedCurrDistrict);
    //         setSelectedWard(selectedCurrWard);
    //         setFieldValue("province", customerUser?.province);
    //         setFieldValue("district", customerUser?.district);
    //         setFieldValue("ward", customerUser?.ward);
    //         setFieldValue("detail_address", customerUser?.detail_address || "");
    //     } else {
    //         setFieldValue("fullName", "");
    //         setFieldValue("phone_number", "");
    //         setSelectedProvince(null);
    //         setSelectedDistrict(null);
    //         setSelectedWard(null);
    //         setFieldValue("province", null);
    //         setFieldValue("district", null);
    //         setFieldValue("ward", null);
    //         setFieldValue("detail_address", "");
    //     }
    // };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("information")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Thông tin khách hàng</h3>
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
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GTextFieldNormal
                            disabled
                            value={customerUser?.phone_number || ""}
                            label="Số điện thoại"
                            fullWidth
                            name="phone_number"
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
                        />
                    </Grid>
                </Grid>
            </div>
            {/* <div className={cx("delivery-information")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Thông tin đặt lịch</h3>
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
                            label="Họ và tên"
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
                            label="Số điện thoại"
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
                            getOptionLabel={(option) => option.province_name}
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
                                    label="Tỉnh/Thành phố"
                                    variant="outlined"
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
                                    label="Quận/Huyện"
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
                                    label="Xã/Phường"
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
                            label="Địa chỉ chi tiết"
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
                </Grid>
            </div> */}
        </div>
    );
}

export default CustomerInformation;
