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
import {
    getDistrict,
    getDistrictById,
    getProvince,
    getProvinceById,
    getWard,
    getWardById,
} from "../../../redux/api/apiProvince";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import PaymentInformation from "../PaymentInformation/PaymentInformation";
const cx = classNames.bind(styles);

function CheckoutInformation() {
    const dispatch = useDispatch();
    const { setFieldValue, values, errors, touched, handleBlur } =
        useFormikContext();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [selectedCurrProvince, setSelectedCurrProvince] = useState(null);
    const [selectedCurrDistrict, setSelectedCurrDistrict] = useState(null);
    const [selectedCurrWard, setSelectedCurrWard] = useState(null);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const [cloneData, setCloneData] = useState([]);

    useEffect(() => {
        if (user) {
            setCloneData(structuredClone(user));
        }
    }, [user]);

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
        if (getProvinceList?.length === 0) {
            getProvince(dispatch);
        }

        setProvinces(getProvinceList);
    }, []);

    // Fn handle province onChange event

    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        if (cloneData) {
            const provinceSelected = getProvinceById(
                cloneData?.province,
                provinces
            );
            setSelectedCurrProvince(provinceSelected);

            // District
            getDistrict(cloneData?.province).then((districtList) => {
                const districtSelected = getDistrictById(
                    cloneData?.district,
                    districtList
                );
                setSelectedCurrDistrict(districtSelected);
                setDistricts(districtList);
            });

            getWard(cloneData?.district).then((wardList) => {
                const wardSelected = getWardById(cloneData?.ward, wardList);
                setSelectedCurrWard(wardSelected);
                setWards(wardList);
            });
        }
    }, [cloneData]);

    // Fn handle province onChange event
    const handleProvinceChange = (event, value) => {
        setSelectedProvince(value);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setFieldValue("province", value?.province_id);

        if (value) {
            getDistrict(value?.province_id).then((districts) => {
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
    const handleDistrictChange = (event, value) => {
        setSelectedDistrict(value);
        setSelectedWard(null);
        setFieldValue("district", value?.district_id);

        if (value) {
            getWard(value?.district_id).then((wards) => {
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
            setFieldValue("ward", value?.ward_id);
        } else {
            setFieldValue("ward", null);
        }
    };

    const handleInfoSame = (e) => {
        if (e.target.checked) {
            setFieldValue("fullName", user?.last_name + " " + user?.first_name);
            setFieldValue("phone_number", user?.phone_number);
            setSelectedProvince(selectedCurrProvince);
            setSelectedDistrict(selectedCurrDistrict);
            setSelectedWard(selectedCurrWard);
            setFieldValue("province", user?.province);
            setFieldValue("district", user?.district);
            setFieldValue("ward", user?.ward);
            setFieldValue("detail_address", user?.detail_address);
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
                            value={user?.last_name + " " + user?.first_name}
                            label="Họ và tên"
                            fullWidth
                            name="last_name"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GTextFieldNormal
                            disabled
                            value={user?.email}
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
                    <Grid item xs={6}>
                        <GTextFieldNormal
                            disabled
                            value={user?.phone_number}
                            label="Số điện thoại"
                            fullWidth
                            name="phone_number"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            disabled
                            options={provinces}
                            getOptionLabel={(option) => option.province_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.province_id === option?.province_id
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
                    <Grid item xs={4}>
                        <Autocomplete
                            disabled
                            options={districts}
                            getOptionLabel={(option) => option.district_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.district_id === option?.district_id
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
                    <Grid item xs={4}>
                        <Autocomplete
                            options={wards}
                            disabled
                            getOptionLabel={(option) => option.ward_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.ward_id === option?.ward_id
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
                            value={user?.detail_address}
                            label="Địa chỉ chi tiết"
                            fullWidth
                            name="detail_address"
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx("delivery-information")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Thông tin giao hàng</h3>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={handleInfoSame} />}
                                label="Giống với thông tin cá nhân"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
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

                    <Grid item xs={6}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
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
                    <Grid item xs={4}>
                        <Autocomplete
                            options={provinces}
                            getOptionLabel={(option) => option.province_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.province_id === option?.province_id
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
                    <Grid item xs={4}>
                        <Autocomplete
                            options={districts}
                            getOptionLabel={(option) => option.district_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.district_id === option?.district_id
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
                    <Grid item xs={4}>
                        <Autocomplete
                            options={wards}
                            getOptionLabel={(option) => option.ward_name}
                            isOptionEqualToValue={(option, value) =>
                                value?.ward_id === option?.ward_id
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
            </div>
            <div>
                <PaymentInformation />
            </div>
        </div>
    );
}

export default CheckoutInformation;
