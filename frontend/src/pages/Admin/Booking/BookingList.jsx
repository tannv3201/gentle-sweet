import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";

import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";

import { API_IMAGE_URL } from "../../../LocalConstants";
import styles from "./Invoice.module.scss";
import classNames from "classnames/bind";
import { InfoRounded } from "@mui/icons-material";
import { getAllInvoice } from "../../../redux/api/apiInvoice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getAllCustomerUser } from "../../../redux/api/apiCustomerUser";
import { getAllProduct } from "../../../redux/api/apiProduct";
import InvoiceClassification from "./FilterInvoice/InvoiceClassification";
import DeleteBookingPopup from "./DeleteBookingPopup";
import CreateBookingModal from "./CreateBookingModal";

const cx = classNames.bind(styles);

export default function BookingList() {
    dayjs.extend(utc);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Check is filtering
    const [isFiltering, setIsFiltering] = useState(false);
    const handleFilter = (newStatus) => {
        setIsFiltering(newStatus);
    };
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

    const invoiceList = useSelector(
        (state) => state.invoice.invoice?.invoiceList
    );

    const invoiceListByStatus = useSelector(
        (state) => state.invoice.invoice?.invoiceListByStatus
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
            }
            if (user?.accessToken) {
                await getAllInvoice(user?.accessToken, dispatch, axiosJWT);
            }
            await getAllProduct(user?.accessToken, dispatch, axiosJWT);
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (isFiltering === true) {
            const newInvoiceList = invoiceListByStatus?.map((invoice) => {
                const customerUser = customerUserList?.find(
                    (item) => item.id === invoice?.customer_user_id
                );
                return {
                    ...invoice,
                    fullName:
                        customerUser?.last_name +
                        " " +
                        customerUser?.first_name,
                    status_name:
                        invoice?.status === 0
                            ? "Đã hủy"
                            : invoice?.status === 1
                            ? "Chờ tiếp nhận"
                            : invoice?.status === 2
                            ? "Đã tiếp nhận"
                            : invoice?.status === 3
                            ? "Đang giao hàng"
                            : invoice?.status === 4
                            ? "Đã giao hàng"
                            : "",
                    created_at: dayjs(invoice?.created_at).format("DD/MM/YYYY"),
                };
            });
            setCloneData(structuredClone(newInvoiceList));
        } else if (invoiceList?.length !== 0 && isFiltering === false) {
            const newInvoiceList = invoiceList?.map((invoice) => {
                const customerUser = customerUserList?.find(
                    (item) => item.id === invoice?.customer_user_id
                );
                return {
                    ...invoice,
                    fullName:
                        customerUser?.last_name +
                        " " +
                        customerUser?.first_name,
                    status_name:
                        invoice?.status === 5
                            ? "Đã hủy"
                            : invoice?.status === 1
                            ? "Chờ tiếp nhận"
                            : invoice?.status === 2
                            ? "Đã tiếp nhận"
                            : invoice?.status === 3
                            ? "Đang giao hàng"
                            : invoice?.status === 4
                            ? "Đã giao hàng"
                            : "Đã hủy",
                    created_at: dayjs(invoice?.created_at).format("DD/MM/YYYY"),
                };
            });
            setCloneData(structuredClone(newInvoiceList));
        }
    }, [invoiceList, invoiceListByStatus, isFiltering]);

    console.log(cloneData);

    // Create update modal
    const [isOpenCreateInvoiceModel, setIsOpenCreateInvoiceModel] =
        useState(false);

    const handleOpenCreateInvoiceModal = () => {
        setIsOpenCreateInvoiceModel(true);
    };

    const handleCloseCreateInvoiceModal = () => {
        setIsOpenCreateInvoiceModel(false);
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

    const handleNavigateInvoiceDetail = (serviceId) => {
        navigate(`/admin/invoice/${serviceId}`);
    };

    return (
        <div className={cx("invoice-list-wrapper")}>
            <div className={cx("btn-list-header")}>
                <GButton onClick={handleOpenCreateInvoiceModal}>
                    Thêm hóa đơn
                </GButton>
                <InvoiceClassification
                    isFiltering={isFiltering}
                    handleFilter={handleFilter}
                />
            </div>
            <br />
            <GTable
                title={"DANH SÁCH ĐƠN HÀNG"}
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
                                    {rowData?.status_name === "Đã hủy" ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "cancel"
                                            )}
                                        >
                                            Đã hủy
                                        </span>
                                    ) : rowData?.status_name ===
                                      "Chờ tiếp nhận" ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "pending"
                                            )}
                                        >
                                            Chờ tiếp nhận
                                        </span>
                                    ) : rowData?.status_name ===
                                      "Đã tiếp nhận" ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "received"
                                            )}
                                        >
                                            Đã tiếp nhận
                                        </span>
                                    ) : rowData?.status_name ===
                                      "Đang giao hàng" ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "delivering"
                                            )}
                                        >
                                            Đang giao hàng
                                        </span>
                                    ) : rowData?.status_name ===
                                      "Giao hàng thành công" ? (
                                        <span
                                            className={cx(
                                                "status_invoice",
                                                "delivered"
                                            )}
                                        >
                                            Giao hàng thành công
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
                                            handleNavigateInvoiceDetail(
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

            <CreateBookingModal
                isOpen={isOpenCreateInvoiceModel}
                handleOpen={handleOpenCreateInvoiceModal}
                handleClose={handleCloseCreateInvoiceModal}
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
