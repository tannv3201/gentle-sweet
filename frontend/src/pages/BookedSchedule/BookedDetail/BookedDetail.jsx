import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookedDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getBookingById } from "../../../redux/api/apiBooking";
import { GFormatDate } from "../../../components/GDatePicker/GDatePicker";
import { getBookingDetailByBookingId } from "../../../redux/api/apiBookingDetail";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { ArrowBackIosNew } from "@mui/icons-material";
import ConfirmCancelBookingPopup from "../ConfirmCancelBookingPopup/ConfirmCancelBookingPopup";
import { GTableProductCheckout } from "../../../components/GTable/GTable";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";
const cx = classNames.bind(styles);

function BookedDetail() {
    const { bookingId } = useParams();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [bookingClone, setBookingClone] = useState({});
    const [deliveryClone, setDeliveryClone] = useState({});
    const [serviceListClone, setServiceListClone] = useState([]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const bookingById = useSelector((state) => state.booking.booking?.booking);

    const deliveryByBookingId = useSelector(
        (state) => state.delivery.delivery?.deliveryByBookingId
    );
    const getCustomerUser = useSelector(
        (state) => state.customerUser.customerUser?.customerUser
    );
    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (getBookingDetail) {
            const newDetailList = getBookingDetail?.map((p) => {
                const serviceInfo = serviceList?.find(
                    (service) => service.id === p?.service_id
                );
                return {
                    ...p,
                    service_name: serviceInfo.name,
                    image_url: serviceInfo.image_url,
                };
            });
            setServiceListClone(newDetailList);
        }
    }, [getBookingDetail]);

    // Get booking
    useEffect(() => {
        const fetch = async () => {
            await getBookingById(
                dispatch,
                bookingId,
                user?.accessToken,
                axiosJWT
            );

            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                user?.accessToken,
                axiosJWT
            );
        };
        fetch();
    }, [bookingId]);

    useEffect(() => {
        if (bookingById) {
            setBookingClone({
                ...bookingById,
                statusName:
                    bookingById?.status === 1
                        ? "Chờ tiếp nhận"
                        : bookingById?.status === 2
                        ? "Đã tiếp nhận"
                        : bookingById?.status === 3
                        ? "Đã lên lịch"
                        : bookingById?.status === 4
                        ? "Bắt đầu dịch vụ"
                        : bookingById?.status === 5
                        ? "Đã hoàn thành"
                        : bookingById?.status === 6
                        ? "Đã hủy"
                        : bookingById?.status === 7
                        ? "Yêu cầu hủy lịch hẹn"
                        : "",
                createdAt: GFormatDate(
                    bookingById?.created_at,
                    "DD-MM-YYYY | HH:mm"
                ),
            });
        }
    }, [bookingById]);

    useEffect(() => {
        if (deliveryByBookingId) {
            setDeliveryClone({
                ...deliveryByBookingId,
                statusName:
                    deliveryByBookingId?.status === 1
                        ? "Chờ xác nhận"
                        : deliveryByBookingId?.status === 2
                        ? "Đang chuẩn bị hàng"
                        : deliveryByBookingId?.status === 3
                        ? "Đang giao hàng"
                        : deliveryByBookingId?.status === 4
                        ? "Đã giao thành công"
                        : "",
                paymentMethodName:
                    deliveryByBookingId?.payment_method === 1
                        ? "Thanh toán khi nhận hàng"
                        : deliveryByBookingId?.payment_method === 2
                        ? "Chuyển khoản ngân hàng"
                        : deliveryByBookingId?.payment_method === 3
                        ? "Ví điện tử"
                        : "",
            });
        }
    }, [deliveryByBookingId]);

    // Delete confirm modal
    const [isOpenConfirmCancelPopup, setIsOpenConfirmCancelPopup] =
        useState(false);

    const handleOpenConfirmCancelPopup = (rowData) => {
        setIsOpenConfirmCancelPopup(true);
    };

    const handleCloseConfirmCancelPopup = () => {
        setIsOpenConfirmCancelPopup(false);
    };
    const handleBack = () => {
        navigate("/quan-ly-lich-dat");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                    Trở lại
                </GButton>
                <div className={cx("booking-wrapper")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("booking-header")}>
                                <h3
                                    className={cx("booking-code")}
                                >{`Lịch hẹn #${bookingId}`}</h3>
                                {bookingClone?.status < 3 && (
                                    <GButton
                                        color={"error"}
                                        onClick={handleOpenConfirmCancelPopup}
                                    >
                                        Hủy lịch hẹn
                                    </GButton>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("booking-info")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            <h3>Thông tin lịch hẹn</h3>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Người tạo:{" "}
                                            <span>{`${
                                                user?.last_name +
                                                " " +
                                                user?.first_name
                                            } - (KH)`}</span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Ngày tạo:{" "}
                                            <span>
                                                {bookingClone?.createdAt}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Tên dịch vụ:{" "}
                                            <span>
                                                {
                                                    serviceListClone[0]
                                                        ?.service_name
                                                }
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Ngày đặt lịch:{" "}
                                            <span>
                                                {GFormatDate(
                                                    serviceListClone[0]?.date,
                                                    "DD-MM-YYYY"
                                                )}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Thời gian bắt đầu:{" "}
                                            <span>
                                                {
                                                    serviceListClone[0]
                                                        ?.start_time
                                                }
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Thời gian kết thúc:{" "}
                                            <span>
                                                {serviceListClone[0]?.end_time}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Trạng thái lịch hẹn:{" "}
                                            <span
                                                className={
                                                    bookingClone?.status === 1
                                                        ? cx("pending")
                                                        : bookingClone?.status ===
                                                          2
                                                        ? cx("received")
                                                        : bookingClone?.status ===
                                                          3
                                                        ? cx("scheduled")
                                                        : bookingClone?.status ===
                                                          4
                                                        ? cx("service-start")
                                                        : bookingClone?.status ===
                                                          5
                                                        ? cx("service-end")
                                                        : bookingClone?.status ===
                                                          6
                                                        ? cx("cancel")
                                                        : bookingClone?.status ===
                                                          7
                                                        ? cx("cancel-pending")
                                                        : ""
                                                }
                                            >
                                                {bookingClone?.statusName}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Ghi chú:{" "}
                                            <span>
                                                {serviceListClone[0]?.note
                                                    ? serviceListClone[0]?.note
                                                    : "--"}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("booking-customer-info")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            <h3>Thông tin khách hàng</h3>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Tên khách hàng:{" "}
                                            <span>
                                                {user?.last_name +
                                                    " " +
                                                    user?.first_name}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            {" "}
                                            Số điện thoại:{" "}
                                            <span>{user?.phone_number}</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Địa chỉ khách hàng:{" "}
                                            <span>
                                                {user?.detail_address ||
                                                    getCustomerUser?.detail_address}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("booking-service-info")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            <h3>Thông tin dịch vụ</h3>
                                        </div>
                                    </Grid>{" "}
                                    <Grid item xs={12}>
                                        <GTableProductCheckout
                                            title={""}
                                            columns={[
                                                {
                                                    title: "Ảnh",
                                                    field: "image_url",
                                                    cellStyle: { width: "20%" },
                                                    render: (rowData) => (
                                                        // eslint-disable-next-line jsx-a11y/alt-text
                                                        <img
                                                            src={
                                                                rowData?.image_url
                                                                    ? `${API_IMAGE_URL}/${rowData?.image_url}`
                                                                    : ""
                                                            }
                                                            style={{
                                                                width: 60,
                                                                height: 60,
                                                                objectFit:
                                                                    "cover",
                                                                borderRadius:
                                                                    "50%",
                                                                border: "1px solid var(--primary-400)",
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    title: "Tên dịch vụ",
                                                    field: "service_name",
                                                    hidden: isSmall
                                                        ? true
                                                        : false,
                                                    render: (rowData) => {
                                                        return (
                                                            <>
                                                                <span
                                                                    className={cx(
                                                                        "service_name"
                                                                    )}
                                                                >
                                                                    {
                                                                        rowData?.service_name
                                                                    }
                                                                </span>
                                                            </>
                                                        );
                                                    },
                                                },
                                                {
                                                    title: "Giá",
                                                    field: "unit_price",
                                                    hidden: isSmall
                                                        ? true
                                                        : false,
                                                    render: (rowData) => {
                                                        return (
                                                            <>
                                                                <span>
                                                                    {FormatCurrency(
                                                                        rowData?.unit_price
                                                                    )}
                                                                </span>
                                                            </>
                                                        );
                                                    },
                                                },
                                                {
                                                    title: "Thông tin",
                                                    hidden: !isSmall
                                                        ? true
                                                        : false,
                                                    render: (rowData) => {
                                                        return (
                                                            <div
                                                                className={cx(
                                                                    "table_service_info"
                                                                )}
                                                            >
                                                                <span
                                                                    className={cx(
                                                                        "table_service_name"
                                                                    )}
                                                                >
                                                                    {
                                                                        rowData?.service_name
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "table_service_price"
                                                                    )}
                                                                >
                                                                    Giá:{" "}
                                                                    <span>
                                                                        {FormatCurrency(
                                                                            rowData?.unit_price
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        );
                                                    },
                                                },
                                            ]}
                                            layout={"auto"}
                                            data={serviceListClone}
                                            exportFileName={"DanhSachSanPham"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("price_total")}>
                                            <div>
                                                <div
                                                    className={cx("sub-total")}
                                                >
                                                    Tạm tính:{" "}
                                                    <span>
                                                        {FormatCurrency(
                                                            serviceListClone[0]
                                                                ?.unit_price
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={cx("total")}>
                                                    Tổng tiền:{" "}
                                                    <span>
                                                        {FormatCurrency(
                                                            serviceListClone[0]
                                                                ?.unit_price
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <ConfirmCancelBookingPopup
                isOpen={isOpenConfirmCancelPopup}
                handleClose={handleCloseConfirmCancelPopup}
                handleOpen={handleOpenConfirmCancelPopup}
                booking={{ bookingId: bookingId, status: bookingClone?.status }}
            />
        </div>
    );
}

export default BookedDetail;
