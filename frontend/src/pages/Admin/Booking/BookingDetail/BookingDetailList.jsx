import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import GTable from "../../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../../components/MyButton/MyButton";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import styles from "./InvoiceDetail.module.scss";
import classNames from "classnames/bind";
import { EditRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import ConfirmDeleteProduct from "./ConfirmDeleteService";
import UpdateProductInvoiceDetailPopup from "./UpdateServiceBookingDetailPopup";
import AddProductInvoiceDetailPopup from "./AddServiceBookingDetailPopup";

const cx = classNames.bind(styles);

export default function BookingDetailList({ isEditting }) {
    dayjs.extend(utc);
    const [cloneData, setCloneData] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({});

    const productList = useSelector(
        (state) => state.product.product?.productList
    );
    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );

    useEffect(() => {
        const arr = getInvoiceDetail?.map((item) => {
            const getProduct = productList?.find(
                (i) => i.id === item?.product_id
            );
            return {
                ...item,
                product_name: getProduct?.name,
                price_total: item?.unit_price * item?.product_quantity,
            };
        });
        setCloneData(structuredClone(arr));
    }, [getInvoiceDetail, productList]);

    // update modal
    const [isOpenUpdateProductPopup, setIsOpenUpdateProductPopup] =
        useState(false);

    const handleOpenUpdateProductPopup = (rowData) => {
        setSelectedProduct(rowData);
        setIsOpenUpdateProductPopup(true);
    };

    const handleCloseUpdateProductPopup = () => {
        setIsOpenUpdateProductPopup(false);
    };

    // Create modal
    const [isOpenAddProductPopup, setIsOpenAddProductPopup] = useState(false);

    const handleOpenAddProductPopup = (rowData) => {
        setSelectedProduct(rowData);
        setIsOpenAddProductPopup(true);
    };

    const handleCloseAddProductPopup = () => {
        setIsOpenAddProductPopup(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmPopup, setIsOpenDeleteConfirmPopup] =
        useState(false);

    const handleOpenDeleteConfirmPopup = (rowData) => {
        const getProduct = productList?.find(
            (item) => item?.id === rowData?.product_id
        );
        setSelectedProduct({
            id: rowData?.id,
            invoice_id: rowData?.invoice_id,
            product_name: getProduct?.name,
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
                    <span>CHI TIẾT HÓA ĐƠN</span>
                    {isEditting && (
                        <GButton
                            onClick={handleOpenAddProductPopup}
                            color={"success"}
                        >
                            Thêm sản phẩm
                        </GButton>
                    )}
                </div>
                {getInvoiceDetail?.length !== 0 ? (
                    <GTable
                        style={{ boxShadow: "unset !important" }}
                        title={""}
                        columns={[
                            {
                                title: "Sản phẩm",
                                field: "product_name",
                            },
                            {
                                title: "Giá",
                                field: "product_price",
                                render: (rowData) => {
                                    return FormatCurrency(rowData?.unit_price);
                                },
                            },
                            {
                                title: "Số lượng",
                                field: "product_quantity",
                            },
                            {
                                title: "Tổng tiền",
                                field: "price_total",
                                render: (rowData) => {
                                    return FormatCurrency(rowData?.price_total);
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
                                            <span>
                                                <IconButton
                                                    disabled={!isEditting}
                                                    onClick={() =>
                                                        handleOpenUpdateProductPopup(
                                                            rowData
                                                        )
                                                    }
                                                >
                                                    <EditRounded
                                                        color={
                                                            !isEditting
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
                                                    disabled={!isEditting}
                                                    onClick={() => {
                                                        handleOpenDeleteConfirmPopup(
                                                            rowData
                                                        );
                                                    }}
                                                >
                                                    <DeleteRoundedIcon
                                                        color={
                                                            !isEditting
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
                        Chưa có sản phẩm nào
                    </div>
                )}
            </div>

            <UpdateProductInvoiceDetailPopup
                isOpen={isOpenUpdateProductPopup}
                handleOpen={handleOpenUpdateProductPopup}
                handleClose={handleCloseUpdateProductPopup}
                selectedProduct={selectedProduct}
            />

            <AddProductInvoiceDetailPopup
                isOpen={isOpenAddProductPopup}
                handleOpen={handleOpenAddProductPopup}
                handleClose={handleCloseAddProductPopup}
            />

            <ConfirmDeleteProduct
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedProduct={selectedProduct}
            />
        </div>
    );
}
