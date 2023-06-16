import axios from "axios";
import {
    getProvinceFailed,
    getProvinceStart,
    getProvinceSuccess,
} from "../slice/provinceSlice";

const BASE_API = "https://provinces.open-api.vn/api/";

export const provinceApi = async (dispatch) => {
    dispatch(getProvinceStart());

    try {
        const res = await axios.get(`${BASE_API}`);
        dispatch(getProvinceSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getProvinceFailed());
    }
};

export const districtApi = async (provinceId) => {
    try {
        const res = await axios.get(
            `${BASE_API}p/${parseInt(provinceId)}?depth=2`
        );
        return res?.data?.districts;
    } catch (error) {
        console.log(error);
    }
};

export const wardApi = async (districtId) => {
    try {
        const res = await axios.get(
            `${BASE_API}d/${parseInt(districtId)}?depth=2`
        );
        return res?.data?.wards;
    } catch (error) {
        console.log(error);
    }
};

export const getProvinceById = (provinceId, provinces) => {
    const res = provinces?.find((p) => p.code === parseInt(provinceId));
    return res;
};

export const getDistrictById = (districtId, districts) => {
    const res = districts?.find((d) => d.code === parseInt(districtId));
    return res;
};

export const getWardById = (wardId, wards) => {
    const res = wards?.find((w) => w.code === parseInt(wardId));
    return res;
};
