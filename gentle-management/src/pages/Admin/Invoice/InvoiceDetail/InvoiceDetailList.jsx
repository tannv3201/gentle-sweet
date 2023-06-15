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
import { EditRounded, ReportProblemRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import UpdateProductInvoiceDetailPopup from "./UpdateProductInvoiceDetailPopup";
import AddProductInvoiceDetailPopup from "./AddProductInvoiceDetailPopup";

const cx = classNames.bind(styles);

export default function InvoiceDetailList({ isEditting }) {
    dayjs.extend(utc);
    const [cloneData, setCloneData] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({});

    const productList = useSelector(
        (state) => state.product.product?.productList
    );
    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );
    const getInvoice = useSelector((state) => state.invoice.invoice?.invoice);

    const user = useSelector((state) => state.auth.login?.currentUser);

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
                    <div className={cx("invoice-detail-title")}>
                        <span>CHI TIẾT ĐƠN HÀNG</span>
                        {cloneData?.length === 0 && (
                            <ReportProblemRounded
                                className={cx("warning")}
                                color="warning"
                            />
                        )}
                    </div>
                    {/* {isEditting && ( */}
                    {getInvoice?.status < 3 &&
                        user?.role_name === "SUPER_ADMIN" && (
                            <GButton
                                onClick={handleOpenAddProductPopup}
                                color={"success"}
                            >
                                Thêm sản phẩm
                            </GButton>
                        )}
                    {/* )} */}
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
                                hidden:
                                    user?.role_name === "SUPER_ADMIN"
                                        ? false
                                        : true,
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
                                                        getInvoice?.status > 2
                                                    }
                                                    onClick={() =>
                                                        handleOpenUpdateProductPopup(
                                                            rowData
                                                        )
                                                    }
                                                >
                                                    <EditRounded
                                                        color={
                                                            getInvoice?.status >
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
                                                        getInvoice?.status > 2
                                                    }
                                                    onClick={() => {
                                                        handleOpenDeleteConfirmPopup(
                                                            rowData
                                                        );
                                                    }}
                                                >
                                                    <DeleteRoundedIcon
                                                        color={
                                                            getInvoice?.status >
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
