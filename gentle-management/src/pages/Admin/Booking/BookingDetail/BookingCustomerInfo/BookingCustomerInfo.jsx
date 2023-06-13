import React, { useEffect, useState } from "react";
import styles from "./BookingCustomerInfo.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ReportProblemRounded } from "@mui/icons-material";
import GButton from "../../../../../components/MyButton/MyButton";
import UpdateCustomerInfoPopup from "./UpdateCustomerInfoPopup";
import { LightTooltip } from "../../../../../components/GTooltip/GTooltip";
import { useNavigate } from "react-router-dom";

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

function BookingCustomerInfo({ currBooking, currCustomerUser }) {
    const [deliveryClone, setDeliveryClone] = useState({});
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    const navigate = useNavigate();
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
    const handleNavigateCustomerAccount = () => {
        navigate(`/customer-user/${currCustomerUser?.id}`);
    };

    return (
        <div className={cx("invoice-customer-info-wrapper")}>
            <div className={cx("customer-info-header")}>
                <div className={cx("header-left")}>
                    <h3>Thông tin khách hàng</h3>{" "}
                    {!currCustomerUser?.detail_address && (
                        <LightTooltip
                            title="Vui lòng cập nhật địa chỉ trong tài khoản của khách hàng"
                            placement="right"
                        >
                            <ReportProblemRounded
                                className={cx("customer-info-warning")}
                                color="warning"
                            />
                        </LightTooltip>
                    )}
                </div>
                {!currCustomerUser?.detail_address && (
                    <div className={cx("header-right")}>
                        <GButton onClick={handleNavigateCustomerAccount}>
                            Cập nhật địa chỉ khách hàng
                        </GButton>
                    </div>
                )}
            </div>
            <div className={cx("customer-info-body")}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Khách hàng"}
                            content={`${currCustomerUser?.last_name} ${currCustomerUser?.first_name}`}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Số điện thoại"}
                            content={currCustomerUser?.phone_number}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoItem
                            label={"Địa chỉ"}
                            content={
                                currCustomerUser?.detail_address
                                    ? currCustomerUser?.detail_address
                                    : "--"
                            }
                        />
                    </Grid>
                </Grid>
            </div>

            <UpdateCustomerInfoPopup
                isOpen={isOpenUpdateCustomerInfoPopup}
                handleOpen={handleOpenUpdateCustomerInfoPopup}
                handleClose={handleCloseUpdateCustomerInfoPopup}
            />
        </div>
    );
}

export default BookingCustomerInfo;
