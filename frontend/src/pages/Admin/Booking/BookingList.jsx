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
import { getAllService } from "../../../redux/api/apiService";

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
                    created_at: dayjs(booking?.created_at).format("DD/MM/YYYY"),
                };
            });
            setCloneData(structuredClone(newBookingList));
        } else if (!location.search) {
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
                    created_at: dayjs(booking?.created_at).format("DD/MM/YYYY"),
                };
            });
            setCloneData(structuredClone(newBookingList));
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
        navigate(`/admin/booking/${bookingId}`);
    };

    return (
        <div className={cx("invoice-list-wrapper")}>
            <div className={cx("btn-list-header")}>
                <GButton onClick={handleOpenCreateBookingModal}>
                    Tạo lịch hẹn
                </GButton>
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
                        title: "Tổng tiền",
                        field: "price_total",
                        render: (rowData) => {
                            return FormatCurrency(rowData?.price_total);
                        },
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
                                <LightTooltip placement="bottom" title="Xóa">
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
