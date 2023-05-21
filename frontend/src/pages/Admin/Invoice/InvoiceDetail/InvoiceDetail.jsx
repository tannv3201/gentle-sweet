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
import { getInvoiceDetailByInvoiceId } from "../../../../redux/api/apiInvoiceDetail";
import ConfirmPopup from "./ConfirmInvoice/ConfirmPopup";
import CancelPopup from "./ConfirmInvoice/CancelPopup";

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

    const getInvoice = useSelector((state) => state.invoice.invoice?.invoice);

    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );

    useEffect(() => {
        setCurrInvoice(structuredClone(getInvoice));
    }, [getInvoice]);

    useEffect(() => {
        setCurrInvoice(structuredClone(getInvoice));
    }, [getInvoice]);

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
            setCurrCustomerUser(
                structuredClone(
                    customerUserList?.find(
                        (item) => item.id === invoice?.customer_user_id
                    )
                )
            );
            if (invoice?.admin_user_id) {
                await getAdminUserById(
                    dispatch,
                    invoice?.admin_user_id,
                    user?.accessToken,
                    axiosJWT
                ).then((invoiceCreator) => {
                    setCurrInvoiceCreator(structuredClone(invoiceCreator));
                });
            }
        };

        fetchData();
    }, [invoiceId]);

    const handleBack = () => {
        navigate("/admin/invoice");
    };

    // Confirm invoice
    const [isOpenConfirmInvoice, setIsOpenConfirmInvoice] = useState(false);

    const handleOpenConfirmInvoice = () => {
        setIsOpenConfirmInvoice(true);
    };

    const handleCloseConfirmInvoice = () => {
        setIsOpenConfirmInvoice(false);
    };

    // Cancel invoice
    const [isOpenCancelInvoice, setIsOpenCancelInvoice] = useState(false);

    const handleOpenCancelInvoice = () => {
        setIsOpenCancelInvoice(true);
    };

    const handleCloseCancelInvoice = () => {
        setIsOpenCancelInvoice(false);
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
                            <div className={cx("button-list")}>
                                {currInvoice?.status === 1 &&
                                    getInvoiceDetail?.length > 0 && (
                                        <>
                                            <GButton
                                                onClick={
                                                    handleOpenConfirmInvoice
                                                }
                                                color={"success"}
                                            >
                                                Xác nhận
                                            </GButton>
                                            <GButton
                                                onClick={
                                                    handleOpenCancelInvoice
                                                }
                                                color={"error"}
                                            >
                                                Hủy
                                            </GButton>
                                        </>
                                    )}
                                {!isEditting ? (
                                    <GButton
                                        onClick={() => setIsEditting(true)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"info"}
                                    >
                                        Chỉnh sửa
                                    </GButton>
                                ) : (
                                    <GButton
                                        onClick={() => setIsEditting(false)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"success"}
                                    >
                                        Lưu lại
                                    </GButton>
                                )}
                            </div>
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
                                        {currInvoice?.status === 1 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "pending"
                                                )}
                                            >
                                                Chờ tiếp nhận
                                            </span>
                                        ) : currInvoice?.status === 2 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "received"
                                                )}
                                            >
                                                Đã tiếp nhận
                                            </span>
                                        ) : currInvoice?.status === 3 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "delivering"
                                                )}
                                            >
                                                Đang giao hàng
                                            </span>
                                        ) : currInvoice?.status === 4 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "delivered"
                                                )}
                                            >
                                                Giao hàng thành công
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        ></span>
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
                <InvoiceDetailList isEditting={isEditting} />
                <ConfirmPopup
                    isOpen={isOpenConfirmInvoice}
                    handleOpen={handleOpenConfirmInvoice}
                    handleClose={handleCloseConfirmInvoice}
                    selectedInvoice={{
                        invoice_id: invoiceId,
                        customer_name:
                            currCustomerUser?.last_name +
                            " " +
                            currCustomerUser?.first_name,
                    }}
                />

                <CancelPopup
                    isOpen={isOpenCancelInvoice}
                    handleOpen={handleOpenCancelInvoice}
                    handleClose={handleCloseCancelInvoice}
                    selectedInvoice={{
                        invoice_id: invoiceId,
                        customer_name:
                            currCustomerUser?.last_name +
                            " " +
                            currCustomerUser?.first_name,
                    }}
                />
                {/* <InvoiceDetailForm /> */}
            </div>
        </>
    );
}
