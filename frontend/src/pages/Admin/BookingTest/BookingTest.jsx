import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GButton from "../../../components/MyButton/MyButton";
import { getAllInvoiceByStatus } from "../../../redux/api/apiInvoice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { toast } from "react-hot-toast";
function BookingTest() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchStatus = searchParams.get("status") || "";
    const [status, setStatus] = useState();
    const dispatch = useDispatch();

    const [selectedInvoice, setSelectedInvoice] = useState({});

    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleSearch = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = () => {
        if (status) {
            setSearchParams({ status });
        } else {
            setSearchParams({});
        }
    };
    useEffect(() => {
        if (searchStatus) {
            getAllInvoiceByStatus(
                searchStatus,
                user?.accessToken,
                dispatch,
                axiosJWT
            ).then(() => toast.success(searchStatus));
        }
    }, [searchStatus]);

    console.log(searchStatus);

    return (
        <>
            <TextField
                label="Search"
                value={status || ""}
                onChange={handleSearch}
            />
            <GButton onClick={handleSubmit}>Tìm kiếm</GButton>
            <ul></ul>
        </>
    );
}

export default BookingTest;
