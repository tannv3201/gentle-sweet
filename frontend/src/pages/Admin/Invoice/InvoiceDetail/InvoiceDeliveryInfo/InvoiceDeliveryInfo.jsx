import React, { useEffect, useState } from "react";
import styles from "./InvoiceDeliveryInfo.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { GFormatDate } from "../../../../../components/GDatePicker/GDatePicker";
import {
    LocalShippingRounded,
    PriorityHighRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import InvoiceStatusMenu from "../InvoiceStatusMenu/InvoiceStatusMenu";
import DeliveryCodePopup from "../DeliveryCode/DeliveryCode";
import GButton from "../../../../../components/MyButton/MyButton";
import ConfirmCancelInvoiceRequestPopup from "../InvoiceStatusMenu/ConfirmCancelInvoiceRequestPopup";

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

function InvoiceDeliveryInfo({
    currInvoice,
    currCustomerUser,
    currInvoiceCreator,
}) {
    const [deliveryClone, setDeliveryClone] = useState({});
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    useEffect(() => {
        if (deliveryByInvoiceId) {
            setDeliveryClone({
                ...deliveryByInvoiceId,
                statusName:
                    deliveryByInvoiceId?.status === 1
                        ? "Chờ xác nhận"
                        : deliveryByInvoiceId?.status === 2
                        ? "Đang chuẩn bị hàng"
                        : deliveryByInvoiceId?.status === 3
                        ? "Đang giao hàng"
                        : deliveryByInvoiceId?.status === 4
                        ? "Đã giao thành công"
                        : "",
                paymentMethodName:
                    deliveryByInvoiceId?.payment_method === 1
                        ? "Thanh toán khi nhận hàng"
                        : deliveryByInvoiceId?.payment_method === 2
                        ? "Chuyển khoản ngân hàng"
                        : deliveryByInvoiceId?.payment_method === 3
                        ? "Ví điện tử"
                        : "",
            });
        }
    }, [deliveryByInvoiceId]);

    const [isOpenDeliveryCodePopup, setIsOpenDeliveryCodePopup] =
        useState(false);
    const handleOpenDeliveryCodePopup = () => {
        setIsOpenDeliveryCodePopup(true);
    };
    const handleCloseDeliveryCodePopup = () => {
        setIsOpenDeliveryCodePopup(false);
    };

    const [
        isOpenConfirmCancelInvoiceRequestPopup,
        setIsOpenConfirmCancelInvoiceRequestPopup,
    ] = useState(false);
    const handleOpenConfirmCancelInvoiceRequestModal = () => {
        setIsOpenConfirmCancelInvoiceRequestPopup(true);
    };

    const handleCloseConfirmCancelInvoiceRequestModal = () => {
        setIsOpenConfirmCancelInvoiceRequestPopup(false);
    };

    return (
        <div className={cx("invoice-delivery-info-wrapper")}>
            <div className={cx("delivery-info-header")}>
                <h3>Thông tin đơn hàng</h3>
                <div className={cx("btn-group")}>
                    {currInvoice?.status > 1 && currInvoice?.status < 4 && (
                        <GButton
                            color={"info"}
                            startIcon={<LocalShippingRounded />}
                            onClick={handleOpenDeliveryCodePopup}
                        >
                            Vận chuyển
                        </GButton>
                    )}
                    {currInvoice?.status > 1 && currInvoice?.status < 5 && (
                        <InvoiceStatusMenu />
                    )}
                    {currInvoice?.status === 7 && (
                        <div className={cx("cancel-request")}>
                            <PriorityHighRounded color="error" /> Yêu cầu hủy
                            đơn hàng:
                            <div className={cx("cancel-request-action")}>
                                <GButton
                                    onClick={
                                        handleOpenConfirmCancelInvoiceRequestModal
                                    }
                                    color={"info"}
                                    startIcon={<VisibilityRounded />}
                                >
                                    Xem
                                </GButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx("delivery-info-body")}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Người tạo"}
                            content={
                                currInvoiceCreator?.id
                                    ? `${currInvoiceCreator?.last_name} 
                                      ${currInvoiceCreator?.first_name} - (ADMIN)`
                                    : `${deliveryClone?.customer_name} - (CUSTOMER)`
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Thời gian tạo"}
                            content={GFormatDate(
                                currInvoice?.created_at,
                                "DD-MM-YYYY | HH:mm"
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div className={cx("info-item")}>
                            <span className={cx("info-item-label")}>
                                Trạng thái đơn hàng
                            </span>
                            :{" "}
                            <span
                                className={
                                    currInvoice?.status === 1
                                        ? cx("info-item-content", "pending")
                                        : currInvoice?.status === 2
                                        ? cx("info-item-content", "received")
                                        : currInvoice?.status === 3
                                        ? cx(
                                              "info-item-content",
                                              "product-waiting"
                                          )
                                        : currInvoice?.status === 4
                                        ? cx("info-item-content", "delivering")
                                        : currInvoice?.status === 5
                                        ? cx("info-item-content", "delivered")
                                        : currInvoice?.status === 6
                                        ? cx("info-item-content", "cancel")
                                        : currInvoice?.status === 7
                                        ? cx(
                                              "info-item-content",
                                              "cancel-pending"
                                          )
                                        : ""
                                }
                            >
                                {currInvoice?.statusName}
                            </span>
                        </div>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <div className={cx("info-item")}>
                            <span className={cx("info-item-label")}>
                                Trạng thái giao hàng
                            </span>
                            :{" "}
                            <span
                                className={
                                    currInvoice?.status !== 5 &&
                                    currInvoice?.status !== 6 &&
                                    deliveryClone?.status === 1
                                        ? cx("info-item-content", "pending")
                                        : deliveryClone?.status === 2
                                        ? cx("info-item-content", "prepare")
                                        : deliveryClone?.status === 3
                                        ? cx("info-item-content", "delivering")
                                        : deliveryClone?.status === 4
                                        ? cx("info-item-content", "completed")
                                        : ""
                                }
                            >
                                {currInvoice?.status !== 5 &&
                                currInvoice?.status !== 6
                                    ? deliveryClone?.statusName
                                    : "--"}
                            </span>
                        </div>
                    </Grid> */}
                    <Grid item xs={6}>
                        <div className={cx("delivery-code")}>
                            <InfoItem
                                label={"Mã vận đơn"}
                                content={
                                    deliveryClone?.delivery_code
                                        ? deliveryClone?.delivery_code
                                        : "--"
                                }
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Đơn vị giao hàng"}
                            content={
                                deliveryClone?.delivery_unit
                                    ? deliveryClone?.delivery_unit
                                    : "--"
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InfoItem
                            label={"Phương thức thanh toán"}
                            content={deliveryClone?.paymentMethodName}
                        />
                    </Grid>
                </Grid>
            </div>
            <DeliveryCodePopup
                isOpen={isOpenDeliveryCodePopup}
                handleOpen={handleOpenDeliveryCodePopup}
                handleClose={handleCloseDeliveryCodePopup}
            />
            <ConfirmCancelInvoiceRequestPopup
                isOpen={isOpenConfirmCancelInvoiceRequestPopup}
                handleOpen={handleOpenConfirmCancelInvoiceRequestModal}
                handleClose={handleCloseConfirmCancelInvoiceRequestModal}
                currInvoice={currInvoice}
            />
        </div>
    );
}

export default InvoiceDeliveryInfo;
