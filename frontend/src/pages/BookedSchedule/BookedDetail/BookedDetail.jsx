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
import { getAllBranch } from "../../../redux/api/apiBranch";
import {
    districtApi,
    getDistrictById,
    getProvinceById,
    getWardById,
    wardApi,
} from "../../../redux/api/apiProvinceOpenAPI";
import GRatingModal from "../../../components/GRatingModal/GRatingModal";
import { getRatingByBookingId } from "../../../redux/api/apiRating";
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
    const getBranchList = useSelector(
        (state) => state.branch.branch?.branchList
    );
    const getProvinceList = structuredClone(
        useSelector((state) => state.province.province.provinceList)
    );

    const ratingBookingList = useSelector(
        (state) => state.rating.rating.ratingBookingList
    );
    const dispatch = useDispatch();

    useEffect(() => {
        getRatingByBookingId(dispatch, bookingId);
    }, [dispatch, bookingId]);

    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        const fetch = async () => {
            if (getBookingDetail) {
                const newList = getBookingDetail?.map((bd) => {
                    const checkExistRating = ratingBookingList?.find(
                        (rating) => rating?.service_id === bd?.service_id
                    );
                    const serviceInfo = serviceList?.find(
                        (service) => service.id === bd?.service_id
                    );
                    return {
                        ...bd,
                        isExistRating: checkExistRating ? true : false,
                        service_name: serviceInfo.name,
                        image_url: serviceInfo.image_url,
                    };
                });
                setServiceListClone(structuredClone(newList));
            }
        };
        fetch();
    }, [getBookingDetail, serviceList, ratingBookingList]);

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

            if (getBranchList?.length === 0) {
                await getAllBranch(dispatch);
            }
        };
        fetch();
    }, [bookingId]);

    useEffect(() => {
        const fetch = async () => {
            if (bookingById) {
                let branchProvinceName;
                let branchDistrictName;
                let branchWardName;

                let customerProvinceName;
                let customerDistrictName;
                let customerWardName;

                const branch = getBranchList?.find(
                    (b) => b?.id === bookingById?.branch_id
                );
                const branchProvinceSelected = getProvinceById(
                    branch?.province,
                    getProvinceList
                );
                branchProvinceName = branchProvinceSelected?.name;

                // District
                await districtApi(parseInt(branch?.province)).then(
                    (districtList) => {
                        const districtSelected = getDistrictById(
                            branch?.district,
                            districtList
                        );
                        branchDistrictName = districtSelected?.name;
                    }
                );

                await wardApi(parseInt(branch?.district)).then((wardList) => {
                    const wardSelected = getWardById(branch?.ward, wardList);
                    branchWardName = wardSelected?.name;
                });

                // customer address
                const customerProvinceSelected = getProvinceById(
                    bookingById?.customer_province,
                    getProvinceList
                );
                customerProvinceName = customerProvinceSelected?.name;
                // District
                await districtApi(
                    parseInt(bookingById?.customer_province)
                ).then((districtList) => {
                    const customerDistrictSelected = getDistrictById(
                        bookingById?.customer_district,
                        districtList
                    );
                    customerDistrictName = customerDistrictSelected?.name;
                });

                await wardApi(parseInt(bookingById?.customer_district)).then(
                    (wardList) => {
                        const customerWardSelected = getWardById(
                            bookingById?.customer_ward,
                            wardList
                        );
                        customerWardName = customerWardSelected?.name;
                    }
                );

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
                    branch_name: branch?.name,
                    branch_address:
                        branch?.detail_address +
                        ", " +
                        branchWardName +
                        ", " +
                        branchDistrictName +
                        ", " +
                        branchProvinceName,
                    customer_address:
                        bookingById?.customer_detail_address +
                        ", " +
                        customerWardName +
                        ", " +
                        customerDistrictName +
                        ", " +
                        customerProvinceName,
                    branch_phone_number: branch?.phone_number,
                });
            }
        };
        fetch();
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

    // Rating modal
    const [isOpenRatingModal, setIsOpenRatingModal] = useState(false);
    const [ratingObject, setRatingObject] = useState({});

    const handleOpenRatingModal = (product) => {
        setRatingObject(product);
        setIsOpenRatingModal(true);
    };

    const handleCloseRatingModal = () => {
        setIsOpenRatingModal(false);
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
                                    {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Người tạo:{" "}
                                            <span>{`${
                                                user?.last_name +
                                                " " +
                                                user?.first_name
                                            } - (KH)`}</span>
                                        </div>
                                    </Grid> */}
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
                                            Ngày tạo:{" "}
                                            <span>
                                                {bookingClone?.createdAt}
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
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Tên chi nhánh:{" "}
                                            <span>
                                                {bookingClone?.branch_name}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Địa chỉ chi nhánh:{" "}
                                            <span>
                                                {bookingClone?.branch_address}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Số điện thoại chi nhánh:{" "}
                                            <span>
                                                {
                                                    bookingClone?.branch_phone_number
                                                }
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            {bookingById?.status >= 6
                                                ? "Lý do hủy"
                                                : "Ghi chú"}
                                            :{" "}
                                            <span>
                                                {/* {serviceListClone[0]?.note
                                                    ? serviceListClone[0]?.note
                                                    : "--"} */}
                                                {bookingById?.status >= 6
                                                    ? bookingById?.note
                                                    : serviceListClone[0]?.note
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
                                            Số điện thoại khách hàng:{" "}
                                            <span>{user?.phone_number}</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Địa chỉ khách hàng:{" "}
                                            <span>
                                                {bookingClone?.customer_address}
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
                                                    title: "Đánh giá",
                                                    field: "unit_price",
                                                    hidden:
                                                        isSmall ||
                                                        bookingClone?.status !==
                                                            5,
                                                    render: (rowData) => {
                                                        return (
                                                            <>
                                                                {rowData?.isExistRating ? (
                                                                    <span
                                                                        className={cx(
                                                                            "isRatedLabel"
                                                                        )}
                                                                    >
                                                                        Đã đánh
                                                                        giá
                                                                    </span>
                                                                ) : (
                                                                    <GButton
                                                                        color={
                                                                            "text"
                                                                        }
                                                                        onClick={() =>
                                                                            handleOpenRatingModal(
                                                                                rowData
                                                                            )
                                                                        }
                                                                    >
                                                                        Đánh giá
                                                                    </GButton>
                                                                )}
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
                                                                {bookingClone?.status ===
                                                                    5 && (
                                                                    <>
                                                                        {rowData?.isExistRating ? (
                                                                            <span
                                                                                className={cx(
                                                                                    "isRatedLabel"
                                                                                )}
                                                                            >
                                                                                Đã
                                                                                đánh
                                                                                giá
                                                                            </span>
                                                                        ) : (
                                                                            <GButton
                                                                                color={
                                                                                    "text"
                                                                                }
                                                                                onClick={() =>
                                                                                    handleOpenRatingModal(
                                                                                        rowData
                                                                                    )
                                                                                }
                                                                            >
                                                                                Đánh
                                                                                giá
                                                                            </GButton>
                                                                        )}
                                                                    </>
                                                                )}
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
                bookingDetail={serviceListClone[0]}
            />
            <GRatingModal
                isOpen={isOpenRatingModal}
                handleClose={handleCloseRatingModal}
                handleOpen={handleOpenRatingModal}
                ratingObject={ratingObject}
                title={"Đánh giá dịch vụ"}
                isService
                bookingId={bookingId}
            />
        </div>
    );
}

export default BookedDetail;
