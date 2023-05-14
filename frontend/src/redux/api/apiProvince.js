import axios from "axios";

const API_URL = "https://vapi.vnappmob.com/api";

export const getProvince = async () => {
    const res = await axios.get(`${API_URL}/province/`);
    return res.data?.results;
};

export const getDistrict = async (provinceId) => {
    const res = await axios.get(`${API_URL}/province/district/${provinceId}`);
    return res.data?.results;
};

export const getWard = async (districtId) => {
    const res = await axios.get(`${API_URL}/province/ward/${districtId}`);
    return res.data?.results;
};

export const getProvinceById = (provinceId, provinces) => {
    const res = provinces?.find((p) => p.province_id === provinceId);
    return res;
};

export const getDistrictById = (districtId, districts) => {
    const res = districts?.find((d) => d.district_id === districtId);
    return res;
};

export const getWardById = (wardId, wards) => {
    const res = wards?.find((w) => w.ward_id === wardId);
    return res;
};
