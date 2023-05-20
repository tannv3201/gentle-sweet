import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import styles from "./InvoiceDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GButton from "../../../../components/MyButton/MyButton";
import { ArrowBackIosNew, ModeEditOutlineRounded } from "@mui/icons-material";

import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { getInvoiceById } from "../../../../redux/api/apiInvoice";
import { getAdminUserById } from "../../../../redux/api/apiAdminUser";
import InvoiceDetailList from "./InvoiceDetailList";
import { getAllProduct } from "../../../../redux/api/apiProduct";
import { getInvoiceDetailByInvoiceId } from "../../../../redux/api/apiInvoiceDetail";

const cx = classNames.bind(styles);

export default function InvoiceDetail() {
    const { invoiceId } = useParams();
    dayjs.extend(utc);
    const [isEditting, setIsEditting] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [currCustomerUser, setCurrCustomerUser] = useState({});
    const [currInvoiceCreator, setCurrInvoiceCreator] = useState({});
    const [currInvoice, setCurrInvoice] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    useEffect(() => {
        const fetchData = async () => {
            await getInvoiceDetailByInvoiceId(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
            const invoice = await getInvoiceById(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
            setCurrInvoice(invoice);
            setCurrCustomerUser(
                customerUserList?.find(
                    (item) => item.id === invoice?.customer_user_id
                )
            );
            if (invoice?.admin_user_id) {
                await getAdminUserById(
                    dispatch,
                    invoice?.admin_user_id,
                    user?.accessToken,
                    axiosJWT
                ).then((invoiceCreator) => {
                    setCurrInvoiceCreator(invoiceCreator);
                });
            }

            // if (invoice?.admin_user_id) {
            //     await getAdminUserById(
            //         dispatch,
            //         invoice?.admin_user_id,
            //         user?.accessToken,
            //         axiosJWT
            //     ).then((invoiceCreator) => {
            //         setCurrInvoiceCreator(invoiceCreator);
            //         console.log(invoiceCreator);
            //     });
            // }
        };

        fetchData();
    }, [invoiceId]);

    const handleBack = () => {
        navigate("/admin/invoice");
    };

    return (
        <>
            <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                Trở lại
            </GButton>
            <div className={cx("wrapper")}>
                <div className={cx("invoice-info-header")}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={cx("invoice-title")}>
                                <span className={cx("title")}>
                                    THÔNG TIN HÓA ĐƠN
                                </span>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                        >
                            {!isEditting ? (
                                <div className={cx("button-list")}>
                                    <GButton
                                        onClick={() => setIsEditting(true)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"success"}
                                    >
                                        Chỉnh sửa
                                    </GButton>
                                </div>
                            ) : (
                                <span className={cx("label-editting")}>
                                    CẬP NHẬT THÔNG TIN
                                </span>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("invoice-info-body")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Khách hàng:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {currCustomerUser?.last_name +
                                                " " +
                                                currCustomerUser?.first_name}
                                        </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Trạng thái:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {currInvoice?.status === 1
                                                ? "Chờ tiếp nhận"
                                                : currInvoice?.status === 2
                                                ? "Đang xử lý"
                                                : currInvoice?.status === 3
                                                ? "Đã xác nhận"
                                                : ""}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Ngày tạo:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {dayjs(
                                                currInvoice?.created_at
                                            ).format("DD/MM/YYYY")}
                                        </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Người tạo:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {currInvoice?.customer_user_id
                                                ? `STAFF - ${
                                                      currInvoiceCreator?.last_name +
                                                      " " +
                                                      currInvoiceCreator?.first_name
                                                  }`
                                                : `CUSTOMER - ${currCustomerUser?.last_name} ${currCustomerUser?.first_name}`}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <InvoiceDetailList />
                {/* <InvoiceDetailForm /> */}
            </div>
        </>
    );
}
