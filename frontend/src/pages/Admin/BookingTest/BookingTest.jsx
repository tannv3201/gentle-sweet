import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GButton from "../../../components/MyButton/MyButton";
import {
    getAllInvoiceByStatus,
    invoiceSearch,
} from "../../../redux/api/apiInvoice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { toast } from "react-hot-toast";
function BookingTest() {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [customerUserId, setCustomerUserId] = useState(
        searchParams.get("customer_user_id") || ""
    );
    const [startDate, setStartDate] = useState(
        searchParams.get("startDate") || ""
    );
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [submitClicked, setSubmitClicked] = useState(false);
    useEffect(() => {
        if (submitClicked) {
            invoiceSearch(
                user?.accessToken,
                {
                    status: status,
                    customer_user_id: customerUserId,
                    startDate: startDate,
                    endDate: endDate,
                },
                dispatch,
                axiosJWT
            );
            const newSearchParams = new URLSearchParams();

            if (status) newSearchParams.set("status", status);
            if (customerUserId)
                newSearchParams.set("customer_user_id", customerUserId);
            if (startDate) newSearchParams.set("startDate", startDate);
            if (endDate) newSearchParams.set("endDate", endDate);
            setSearchParams(newSearchParams);
            setSubmitClicked(false);
        }
    }, [submitClicked, customerUserId, endDate, startDate, status]);

    const handleSearch = () => {
        setSubmitClicked(true);
    };

    return (
        <>
            <TextField
                label="Status"
                value={status || ""}
                onChange={(e) => setStatus(e.target.value)}
            />
            <TextField
                label="Customer Id"
                value={customerUserId || ""}
                onChange={(e) => setCustomerUserId(e.target.value)}
            />
            <TextField
                label="Start Date"
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
                label="End Date"
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <GButton onClick={handleSearch}>Tìm kiếm</GButton>
        </>
    );
}

export default BookingTest;
