import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import GTable from "../../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../../components/MyButton/MyButton";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import styles from "./BookingDetail.module.scss";
import classNames from "classnames/bind";
import { EditRounded, ReportProblemRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import UpdateServiceInvoiceDetailPopup from "./UpdateServiceBookingDetail";
import ConfirmDeleteService from "./ConfirmDeleteService";
import AddServiceToBookingDetail from "./AddServiceToBookingDetail";
import { GFormatDate } from "../../../../components/GDatePicker/GDatePicker";

const cx = classNames.bind(styles);

export default function BookingDetailList({ isEditting }) {
    dayjs.extend(utc);
    const [cloneData, setCloneData] = useState([]);

    const [selectedService, setSelectedService] = useState({});

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );
    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    const getBooking = useSelector((state) => state.booking.booking?.booking);

    useEffect(() => {
        const arr = getBookingDetail?.map((item) => {
            const getService = serviceList?.find(
                (i) => i.id === item?.service_id
            );
            return {
                ...item,
                service_name: getService?.name,
                price_total: item?.unit_price,
            };
        });
        setCloneData(structuredClone(arr));
    }, [getBookingDetail, serviceList]);

    // update modal
    const [isOpenUpdateServicePopup, setIsOpenUpdateServicePopup] =
        useState(false);

    const handleOpenUpdateServicePopup = (rowData) => {
        setSelectedService(rowData);
        setIsOpenUpdateServicePopup(true);
    };

    const handleCloseUpdateServicePopup = () => {
        setIsOpenUpdateServicePopup(false);
    };

    // Create modal
    const [isOpenAddServicePopup, setIsOpenAddServicePopup] = useState(false);

    const handleOpenAddServicePopup = (rowData) => {
        setSelectedService(rowData);
        setIsOpenAddServicePopup(true);
    };

    const handleCloseAddServicePopup = () => {
        setIsOpenAddServicePopup(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmPopup, setIsOpenDeleteConfirmPopup] =
        useState(false);

    const handleOpenDeleteConfirmPopup = (rowData) => {
        const getService = serviceList?.find(
            (item) => item?.id === rowData?.service_id
        );
        setSelectedService({
            id: rowData?.id,
            booking_id: rowData?.booking_id,
            service_name: getService?.name,
        });
        setIsOpenDeleteConfirmPopup(true);
    };

    const handleCloseDeleteConfirmPopup = () => {
        setIsOpenDeleteConfirmPopup(false);
    };
    return (
        <div className={cx("wrapper-invoice_detail_list")}>
            <div className={cx("table-invoice-detail")}>
                <div className={cx("header-table-invoice-detail")}>
                    <div className={cx("invoice-detail-title")}>
                        <span>DANH SÁCH DỊCH VỤ</span>
                        {cloneData?.length === 0 && (
                            <LightTooltip
                                title="Vui lòng chọn dịch vụ"
                                placement="right"
                            >
                                <ReportProblemRounded
                                    className={cx("warning")}
                                    color="warning"
                                />
                            </LightTooltip>
                        )}
                    </div>
                    {getBooking?.status < 3 && (
                        <GButton
                            onClick={handleOpenAddServicePopup}
                            color={"success"}
                        >
                            Thêm dịch vụ
                        </GButton>
                    )}
                </div>
                {getBookingDetail?.length !== 0 ? (
                    <GTable
                        style={{ boxShadow: "unset !important" }}
                        title={""}
                        columns={[
                            {
                                title: "Dịch vụ",
                                field: "service_name",
                            },
                            {
                                title: "Ngày đặt",
                                field: "date",
                                render: (rowData) => {
                                    return GFormatDate(
                                        rowData?.date,
                                        "DD-MM-YYYY"
                                    );
                                },
                            },
                            {
                                title: "Khung giờ",
                                field: "start_time",
                                render: (rowData) => {
                                    return (
                                        rowData?.start_time?.slice(0, 5) +
                                        "-" +
                                        rowData?.end_time?.slice(0, 5)
                                    );
                                },
                            },
                            {
                                title: "Giá",
                                field: "unit_price",
                                render: (rowData) => {
                                    return FormatCurrency(rowData?.unit_price);
                                },
                            },
                            {
                                title: "Ghi chú",
                                field: "description",
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
                                            <span>
                                                <IconButton
                                                    disabled={
                                                        getBooking?.status > 2
                                                    }
                                                    onClick={() =>
                                                        handleOpenUpdateServicePopup(
                                                            rowData
                                                        )
                                                    }
                                                >
                                                    <EditRounded
                                                        color={
                                                            getBooking?.status >
                                                            2
                                                                ? "neutral"
                                                                : "primary"
                                                        }
                                                    />
                                                </IconButton>
                                            </span>
                                        </LightTooltip>
                                        <LightTooltip
                                            placement="bottom"
                                            title="Xóa"
                                        >
                                            <span>
                                                <IconButton
                                                    disabled={
                                                        getBooking?.status > 2
                                                    }
                                                    onClick={() => {
                                                        handleOpenDeleteConfirmPopup(
                                                            rowData
                                                        );
                                                    }}
                                                >
                                                    <DeleteRoundedIcon
                                                        color={
                                                            getBooking?.status >
                                                            2
                                                                ? "neutral"
                                                                : "error"
                                                        }
                                                    />
                                                </IconButton>
                                            </span>
                                        </LightTooltip>
                                    </div>
                                ),
                            },
                        ]}
                        data={cloneData || []}
                        exportFileName={"DanhSachNguoiDung"}
                    />
                ) : (
                    <div className={cx("no-invoice-detail")}>
                        Chưa có dịch vụ nào
                    </div>
                )}
            </div>

            <UpdateServiceInvoiceDetailPopup
                isOpen={isOpenUpdateServicePopup}
                handleOpen={handleOpenUpdateServicePopup}
                handleClose={handleCloseUpdateServicePopup}
                selectedService={selectedService}
            />

            <AddServiceToBookingDetail
                isOpen={isOpenAddServicePopup}
                handleOpen={handleOpenAddServicePopup}
                handleClose={handleCloseAddServicePopup}
            />

            <ConfirmDeleteService
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedService={selectedService}
            />
        </div>
    );
}
