import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import {
    getDistrict,
    getDistrictById,
    getProvince,
    getProvinceById,
    getWard,
    getWardById,
} from "../../../redux/api/apiProvince";
import { useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { getCustomerUserById } from "../../../redux/api/apiCustomerUser";
import styles from "./DetailBookedSchedule.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function CustomerInfo() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getCustomerUser = useSelector(
        (state) => state.customerUser.customerUser?.customerUser
    );
    const dispatch = useDispatch();

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
        if (getProvinceList?.length === 0) {
            getProvince(dispatch);
        }

        setProvinces(getProvinceList);
    }, []);

    useEffect(() => {
        if (getCustomerUser) setCustomerUser(getCustomerUser);
    }, [getCustomerUser]);

    // Fn handle province onChange event

    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        if (customerUser) {
            const provinceSelected = getProvinceById(
                customerUser?.province,
                provinces
            );
            setSelectedCurrProvince(provinceSelected);

            // District
            getDistrict(customerUser?.province).then((districtList) => {
                const districtSelected = getDistrictById(
                    customerUser?.district,
                    districtList
                );
                setSelectedCurrDistrict(districtSelected);
                setDistricts(districtList);
            });

            getWard(customerUser?.district).then((wardList) => {
                const wardSelected = getWardById(customerUser?.ward, wardList);
                setSelectedCurrWard(wardSelected);
                setWards(wardList);
            });
        }
    }, [customerUser]);
    return (
        <div className={cx("customer-info-wrapper")}>
            <div className={cx("customer-info-title")}>
                <h3>Thông tin cá nhân</h3>
            </div>
            <Grid container spacing={2}>
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
                <Grid item lg={4} md={12} sm={12} xs={12}>
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
                <Grid item lg={4} md={12} sm={12} xs={12}>
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
                        value={customerUser?.detail_address || ""}
                        label="Địa chỉ chi tiết"
                        fullWidth
                        name="detail_address"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CustomerInfo;
