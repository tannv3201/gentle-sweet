import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProvince } from "../../../redux/api/apiProvince";
import { useDispatch } from "react-redux";

function Dashboard() {
    const getProvinceList = structuredClone(
        useSelector((state) => state.province.province.provinceList)
    );
    const dispatch = useDispatch();
    // Get province list from API
    useEffect(() => {
        if (getProvinceList?.length === 0) {
            getProvince(dispatch);
        }
    }, []);
    return <h1>Dashboard</h1>;
}

export default Dashboard;
