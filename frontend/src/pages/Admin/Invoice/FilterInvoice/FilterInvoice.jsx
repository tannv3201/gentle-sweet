import React, { useEffect } from "react";
import { useState } from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { FilterListRounded } from "@mui/icons-material";
import { Autocomplete, Grid } from "@mui/material";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import styles from "./FilterInvoice.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { invoiceSearch } from "../../../../redux/api/apiInvoice";
import GDatePicker, {
    GFormatDate,
} from "../../../../components/GDatePicker/GDatePicker";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

const invoiceStatus = [
    {
        id: 1,
        name: "Chờ xác nhận",
    },
    {
        id: 2,
        name: "Đã xác nhận",
    },
    {
        id: 3,
        name: "Đang giao hàng",
    },
    {
        id: 4,
        name: "Giao hàng thành công",
    },
    {
        id: 5,
        name: "Đã hủy",
    },
];

function FilterInvoice({ isFiltering, setIsFiltering }) {
    const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
    const dispatch = useDispatch();
    const customerUserList = structuredClone(
        useSelector(
            (state) => state.customerUser.customerUser?.customerUserList
        )
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState(searchParams.get("status") || null);
    const [customerUserId, setCustomerUserId] = useState(
        searchParams.get("customer_user_id") || null
    );
    const [startDate, setStartDate] = useState(
        searchParams.get("startDate") || null
    );
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || null);

    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [submitClicked, setSubmitClicked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetch = async () => {
            if (location.search || submitClicked) {
                await invoiceSearch(
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
                setIsFiltering(!isFiltering);
            }
        };
        fetch();
    }, [submitClicked, customerUserId, endDate, startDate, status]);

    const handleSearch = () => {
        setSubmitClicked(true);
    };

    const handleChangeStartDate = (date) => {
        setStartDate(GFormatDate(date, "YYYY/MM/DD"));
    };
    const handleChangeEndDate = (date) => {
        setEndDate(GFormatDate(date, "YYYY/MM/DD"));
    };
    return (
        <>
            <GButton
                color={"success"}
                onClick={() => setIsOpenFilterBox((prev) => !prev)}
                startIcon={<FilterListRounded />}
            >
                Tìm kiếm
            </GButton>
            <div
                className={
                    isOpenFilterBox
                        ? cx("search-box-container", "isOpen")
                        : cx("search-box-container")
                }
            >
                <div className={cx("search-box")}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Autocomplete
                                options={invoiceStatus}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || null
                                }
                                value={
                                    status
                                        ? {
                                              id: status,
                                              name: invoiceStatus?.find(
                                                  (i) =>
                                                      i.id === parseInt(status)
                                              )?.name,
                                          }
                                        : null
                                }
                                onChange={(e, value) => {
                                    setStatus(value?.id);
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === null || option?.id === value?.id
                                }
                                renderInput={(params) => (
                                    <GTextFieldNormal
                                        {...params}
                                        name="id"
                                        fullWidth
                                        label="Trạng thái"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                options={customerUserList}
                                getOptionLabel={(option) =>
                                    `${option?.last_name} ${option?.first_name} ` ||
                                    null
                                }
                                onChange={(e, value) => {
                                    setCustomerUserId(value?.id);
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                value={
                                    customerUserId
                                        ? {
                                              id: customerUserId,
                                              last_name: customerUserList?.find(
                                                  (i) =>
                                                      i.id ===
                                                      parseInt(customerUserId)
                                              )?.last_name,
                                              first_name:
                                                  customerUserList?.find(
                                                      (i) =>
                                                          i.id ===
                                                          parseInt(
                                                              customerUserId
                                                          )
                                                  )?.first_name,
                                          }
                                        : null
                                }
                                renderInput={(params) => (
                                    <GTextFieldNormal
                                        {...params}
                                        name="id"
                                        fullWidth
                                        label="Chọn khách hàng"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <GDatePicker
                                label={"Từ ngày"}
                                fullWidth
                                name="birth_date"
                                onChange={(date) =>
                                    handleChangeStartDate(
                                        GFormatDate(date, "YYYY/MM/DD")
                                    )
                                }
                                value={startDate ? dayjs(startDate) : null}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <GDatePicker
                                label={"Từ ngày"}
                                fullWidth
                                name="birth_date"
                                onChange={(date) =>
                                    handleChangeEndDate(
                                        GFormatDate(date, "YYYY/MM/DD")
                                    )
                                }
                                value={endDate ? dayjs(endDate) : null}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display={"flex"}
                            justifyContent={"flex-end"}
                        >
                            <div>
                                <GButton
                                    color={"text"}
                                    onClick={() => {
                                        setStatus(null);
                                        setCustomerUserId(null);
                                        setStartDate(null);
                                        setEndDate(null);
                                        setIsFiltering(false);
                                    }}
                                >
                                    Xóa bộ lọc
                                </GButton>
                                <GButton onClick={handleSearch}>
                                    Tìm kiếm
                                </GButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default FilterInvoice;
