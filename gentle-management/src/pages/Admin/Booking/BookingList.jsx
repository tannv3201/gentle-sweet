import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";

import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";

import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
import { InfoRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getAllCustomerUser } from "../../../redux/api/apiCustomerUser";
import FilterInvoice from "./FilterBooking/FilterBooking";
import CreateInvoiceModal from "./CreateBookingModal";
import DeleteBookingPopup from "./DeleteBookingPopup";
import { getAllBooking } from "../../../redux/api/apiBooking";
import { getAllService, getServiceById } from "../../../redux/api/apiService";
import { getBookingDetailByBookingId } from "../../../redux/api/apiBookingDetail";

const cx = classNames.bind(styles);

export default function BookingList() {
    dayjs.extend(utc);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Check is filtering
    const [isFiltering, setIsFiltering] = useState(false);

    const [selectedInvoice, setSelectedInvoice] = useState({});
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    useEffect(() => {
        if (customerUserList?.length === 0) {
            getAllCustomerUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const bookingList = useSelector(
        (state) => state.booking.booking?.bookingList
    );

    const bookingListSearch = useSelector(
        (state) => state.booking.booking?.bookingListSearch
    );

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
            }

            if (bookingList) {
                await getAllBooking(user?.accessToken, dispatch, axiosJWT);
            }
            if (serviceList?.length === 0) {
                await getAllService(user?.accessToken, dispatch, axiosJWT);
            }
        };

        fetchData();
    }, []);

    const location = useLocation();

    useEffect(() => {
        if (location.search) {
            const fetch = async () => {
                const newBookingList = bookingListSearch?.map((booking) => {
                    const customerUser = customerUserList?.find(
                        (item) => item.id === booking?.customer_user_id
                    );
                    return {
                        ...booking,
                        fullName:
                            customerUser?.last_name +
                            " " +
                            customerUser?.first_name,
                        status_name:
                            booking?.status === 1
                                ? "Chờ tiếp nhận"
                                : booking?.status === 2
                                ? "Đã tiếp nhận"
                                : booking?.status === 3
                                ? "Đã lên lịch"
                                : booking?.status === 4
                                ? "Bắt đầu dịch vụ"
                                : booking?.status === 5
                                ? "Đã hoàn thành"
                                : booking?.status === 6
                                ? "Đã hủy"
                                : booking?.status === 7
                                ? "Yêu cầu hủy lịch hẹn"
                                : "",
                        created_at: dayjs(booking?.created_at).format(
                            "DD/MM/YYYY"
                        ),
                    };
                });
                const bookingIds = newBookingList?.map((b) => b?.id);
                const bookingDetailsPromise = bookingIds?.map((id) =>
                    getBookingDetailByBookingId(
                        dispatch,
                        id,
                        user?.accessToken,
                        axiosJWT
                    )
                );
                const bookingDetails = await Promise.all(bookingDetailsPromise);
                const serviceIds = bookingDetails
                    .flat()
                    .map((item) => item?.service_id);
                const servicesPromise = serviceIds.map((id) =>
                    getServiceById(dispatch, id, user?.accessToken, axiosJWT)
                );
                const services = await Promise.all(servicesPromise);

                const finalList = newBookingList.map((booking) => {
                    const detailList = bookingDetails
                        .flat()
                        .filter((d) => parseInt(d?.booking_id) === booking?.id);

                    const filterServiceDetail = detailList.map(
                        (serviceDetail) => {
                            const service = services.find(
                                (p) => p?.id === serviceDetail?.service_id
                            );

                            return {
                                // ...serviceDetail,
                                // image_url: service ? service.image_url : null,
                                service_name: service ? service.name : null,
                            };
                        }
                    );

                    return {
                        ...booking,
                        service_name: filterServiceDetail[0]?.service_name,
                    };
                });
                setCloneData(structuredClone(finalList));
            };
            fetch();
        } else if (!location.search) {
            const fetch = async () => {
                const newBookingList = bookingList?.map((booking) => {
                    const customerUser = customerUserList?.find(
                        (item) => item.id === booking?.customer_user_id
                    );
                    return {
                        ...booking,
                        fullName:
                            customerUser?.last_name +
                            " " +
                            customerUser?.first_name,
                        status_name:
                            booking?.status === 1
                                ? "Chờ tiếp nhận"
                                : booking?.status === 2
                                ? "Đã tiếp nhận"
                                : booking?.status === 3
                                ? "Đã lên lịch"
                                : booking?.status === 4
                                ? "Bắt đầu dịch vụ"
                                : booking?.status === 5
                                ? "Đã hoàn thành"
                                : booking?.status === 6
                                ? "Đã hủy"
                                : booking?.status === 7
                                ? "Yêu cầu hủy lịch hẹn"
                                : "",
                        created_at: dayjs(booking?.created_at).format(
                            "DD/MM/YYYY"
                        ),
                    };
                });
                const bookingIds = newBookingList?.map((b) => b?.id);
                const bookingDetailsPromise = bookingIds?.map((id) =>
                    getBookingDetailByBookingId(
                        dispatch,
                        id,
                        user?.accessToken,
                        axiosJWT
                    )
                );
                const bookingDetails = await Promise.all(bookingDetailsPromise);
                const serviceIds = bookingDetails
                    .flat()
                    .map((item) => item?.service_id);
                const servicesPromise = serviceIds.map((id) =>
                    getServiceById(dispatch, id, user?.accessToken, axiosJWT)
                );
                const services = await Promise.all(servicesPromise);

                const finalList = newBookingList.map((booking) => {
                    const detailList = bookingDetails
                        .flat()
                        .filter((d) => parseInt(d?.booking_id) === booking?.id);

                    const filterServiceDetail = detailList.map(
                        (serviceDetail) => {
                            const service = services.find(
                                (p) => p?.id === serviceDetail?.service_id
                            );

                            return {
                                // ...serviceDetail,
                                // image_url: service ? service.image_url : null,
                                service_name: service ? service.name : null,
                            };
                        }
                    );

                    return {
                        ...booking,
                        service_name: filterServiceDetail[0]?.service_name,
                    };
                });

                setCloneData(structuredClone(finalList));
            };
            fetch();
        }
    }, [bookingList, bookingListSearch, isFiltering]);

    // Create update modal
    const [isOpenCreateBookingModel, setIsOpenCreateBookingModel] =
        useState(false);

    const handleOpenCreateBookingModal = () => {
        setIsOpenCreateBookingModel(true);
    };

    const handleCloseCreateBookingModal = () => {
        setIsOpenCreateBookingModel(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmPopup, setIsOpenDeleteConfirmPopup] =
        useState(false);
    const handleOpenDeleteConfirmPopup = (rowData) => {
        setSelectedInvoice({
            id: rowData.id,
            name: rowData.name,
            description: rowData.description,
        });
        setIsOpenDeleteConfirmPopup(true);
    };

    const handleCloseDeleteConfirmPopup = () => {
        setIsOpenDeleteConfirmPopup(false);
    };

    const handleNavigateBookingDetail = (bookingId) => {
        navigate(`/booking/${bookingId}`);
    };

    return (
        <div className={cx("invoice-list-wrapper")}>
            <div className={cx("btn-list-header")}>
                {user?.role_name === "SUPER_ADMIN" && (
                    <GButton onClick={handleOpenCreateBookingModal}>
                        Thêm lịch hẹn
                    </GButton>
                )}
                <FilterInvoice
                    isFiltering={isFiltering}
                    setIsFiltering={setIsFiltering}
                />
            </div>
            <br />
            <GTable
                title={"DANH SÁCH LỊCH HẸN"}
                columns={[
                    {
                        title: "Khách hàng",
                        field: "fullName",
                    },
                    {
                        title: "Ngày tạo",
                        field: "created_at",
                    },
                    {
                        title: "Tên dịch vụ",
                        field: "service_name",
                    },
                    {
                        title: "Trạng thái",
                        field: "status_name",
                        render: (rowData) => {
                            return (
                                <>
                                    {rowData?.status === 1 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "pending"
                                            )}
                                        >
                                            Chờ tiếp nhận
                                        </span>
                                    ) : rowData?.status === 2 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "received"
                                            )}
                                        >
                                            Đã tiếp nhận
                                        </span>
                                    ) : rowData?.status === 3 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "planned"
                                            )}
                                        >
                                            Đã lên lịch
                                        </span>
                                    ) : rowData?.status === 4 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "service-start"
                                            )}
                                        >
                                            Bắt đầu dịch vụ
                                        </span>
                                    ) : rowData?.status === 5 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "service-completed"
                                            )}
                                        >
                                            Đã hoàn thành
                                        </span>
                                    ) : rowData?.status === 6 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "cancel"
                                            )}
                                        >
                                            Đã hủy
                                        </span>
                                    ) : rowData?.status === 7 ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "cancel-pending"
                                            )}
                                        >
                                            Yêu cầu hủy lịch hẹn
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </>
                            );
                        },
                    },
                    {
                        title: "Thao tác",
                        field: "actions",
                        sorting: false,
                        export: false,
                        render: (rowData) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <LightTooltip
                                    placement="bottom"
                                    title="Chi tiết"
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleNavigateBookingDetail(
                                                rowData?.id
                                            );
                                        }}
                                    >
                                        <InfoRounded color="primary" />
                                    </IconButton>
                                </LightTooltip>
                                {user?.role_id === 1 && (
                                    <LightTooltip
                                        placement="bottom"
                                        title="Xóa"
                                    >
                                        <IconButton
                                            onClick={() => {
                                                handleOpenDeleteConfirmPopup(
                                                    rowData
                                                );
                                            }}
                                        >
                                            <DeleteRoundedIcon color="error" />
                                        </IconButton>
                                    </LightTooltip>
                                )}
                            </div>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
            />

            <CreateInvoiceModal
                isOpen={isOpenCreateBookingModel}
                handleOpen={handleOpenCreateBookingModal}
                handleClose={handleCloseCreateBookingModal}
            />

            <DeleteBookingPopup
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedInvoice={selectedInvoice}
            />
        </div>
    );
}
