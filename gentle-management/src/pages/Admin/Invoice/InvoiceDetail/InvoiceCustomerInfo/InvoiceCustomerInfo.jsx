import React, { useEffect, useState } from "react";
import styles from "./InvoiceCustomerInfo.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ReportProblemRounded } from "@mui/icons-material";
import GButton from "../../../../../components/MyButton/MyButton";
import UpdateCustomerInfoPopup from "./UpdateCustomerInfoPopup";

const cx = classNames.bind(styles);

function InfoItem({ label, content }) {
    return (
        <>
            <div className={cx("info-item")}>
                <span className={cx("info-item-label")}>{label}</span>:{" "}
                <span className={cx("info-item-content")}>{content}</span>
            </div>
        </>
    );
}

function InvoiceCustomerInfo({ currInvoice, currCustomerUser }) {
    const [deliveryClone, setDeliveryClone] = useState({});
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    useEffect(() => {
        if (deliveryByInvoiceId) {
            setDeliveryClone(deliveryByInvoiceId);
        }
    }, [deliveryByInvoiceId]);

    const [isOpenUpdateCustomerInfoPopup, setIsOpenUpdateCustomerInfoPopup] =
        useState(false);

    const handleOpenUpdateCustomerInfoPopup = () => {
        setIsOpenUpdateCustomerInfoPopup(true);
    };

    const handleCloseUpdateCustomerInfoPopup = () => {
        setIsOpenUpdateCustomerInfoPopup(false);
    };

    return (
        <div className={cx("invoice-customer-info-wrapper")}>
            <div className={cx("customer-info-header")}>
                <div className={cx("header-left")}>
                    <h3>Thông tin khách hàng</h3>{" "}
                    {deliveryClone?.status === 404 && (
                        <ReportProblemRounded
                            className={cx("customer-info-warning")}
                            color="warning"
                        />
                    )}
                </div>
                {deliveryClone?.status === 404 && (
                    <div className={cx("header-right")}>
                        <GButton onClick={handleOpenUpdateCustomerInfoPopup}>
                            Nhập thông tin khách hàng
                        </GButton>
                    </div>
                )}
            </div>
            <div className={cx("customer-info-body")}>
                {deliveryClone?.status !== 404 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InfoItem
                                label={"Tên khách hàng"}
                                content={deliveryClone?.customer_name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InfoItem
                                label={"Số điện thoại"}
                                content={deliveryClone?.customer_phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InfoItem
                                label={"Địa chỉ giao hàng"}
                                content={deliveryClone?.detail_address}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InfoItem
                                label={"Khách hàng"}
                                content={`${currCustomerUser?.last_name} ${currCustomerUser?.first_name}`}
                            />
                        </Grid>
                    </Grid>
                )}
            </div>

            <UpdateCustomerInfoPopup
                isOpen={isOpenUpdateCustomerInfoPopup}
                handleOpen={handleOpenUpdateCustomerInfoPopup}
                handleClose={handleCloseUpdateCustomerInfoPopup}
            />
        </div>
    );
}

export default InvoiceCustomerInfo;
