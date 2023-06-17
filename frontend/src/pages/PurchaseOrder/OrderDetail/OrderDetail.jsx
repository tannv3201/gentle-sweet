import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./OrderDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getInvoiceById } from "../../../redux/api/apiInvoice";
import { GFormatDate } from "../../../components/GDatePicker/GDatePicker";
import { getDeliveryByInvoiceId } from "../../../redux/api/apiDelivery";
import { getInvoiceDetailByInvoiceId } from "../../../redux/api/apiInvoiceDetail";
import { API_IMAGE_URL } from "../../../LocalConstants";
import ConfirmCancelOrderPopup from "../ConfirmCancelOrderPopup/ConfirmCancelOrderPopup";
import { ArrowBackIosNew } from "@mui/icons-material";
import { GTableProductCheckout } from "../../../components/GTable/GTable";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    districtApi,
    getDistrictById,
    getProvinceById,
    getWardById,
    wardApi,
} from "../../../redux/api/apiProvinceOpenAPI";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";

const cx = classNames.bind(styles);

function OrderDetail() {
    const { invoiceId } = useParams();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [invoiceClone, setInvoiceClone] = useState({});
    const [deliveryClone, setDeliveryClone] = useState({});
    const [productListClone, setProductListClone] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const invoiceById = useSelector((state) => state.invoice.invoice?.invoice);
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );
    const getProvinceList = structuredClone(
        useSelector((state) => state.province.province.provinceList)
    );
    useEffect(() => {
        const priceTotal = productListClone?.reduce(
            (accumulator, currentValue) => {
                return (
                    accumulator +
                    parseFloat(currentValue?.unit_price) *
                        currentValue?.product_quantity
                );
            },
            0
        );
        setPriceTotal(priceTotal);
    }, [productListClone]);
    const [provinces, setProvinces] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    // Get province list from API
    useEffect(() => {
        setProvinces(getProvinceList);
    }, []);

    const productList = useSelector(
        (state) => state.product.product?.productList
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (getInvoiceDetail) {
            const newDetailList = getInvoiceDetail?.map((p) => {
                const productInfo = productList?.find(
                    (product) => product.id === p?.product_id
                );
                return {
                    ...p,
                    product_name: productInfo.name,
                    image_url: productInfo.image_url,
                };
            });
            setProductListClone(newDetailList);
        }
    }, [getInvoiceDetail, productList]);

    // Get invoice
    useEffect(() => {
        const fetch = async () => {
            await getInvoiceById(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
            await getDeliveryByInvoiceId(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
            await getInvoiceDetailByInvoiceId(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
        };
        fetch();
    }, [invoiceId]);

    useEffect(() => {
        const price_total = productListClone?.reduce(
            (accumulator, currentValue) => {
                return (
                    accumulator +
                    parseFloat(currentValue?.unit_price) *
                        currentValue?.product_quantity
                );
            },
            0
        );
        setInvoiceClone({
            ...invoiceClone,
            provisional_price: price_total,
        });
    }, [productListClone]);

    useEffect(() => {
        if (invoiceById) {
            setInvoiceClone({
                ...invoiceById,
                statusName:
                    invoiceById?.status === 1
                        ? "Chờ tiếp nhận"
                        : invoiceById?.status === 2
                        ? "Đã tiếp nhận"
                        : invoiceById?.status === 3
                        ? "Chờ lấy hàng"
                        : invoiceById?.status === 4
                        ? "Đang vận chuyển"
                        : invoiceById?.status === 5
                        ? "Đã giao"
                        : invoiceById?.status === 6
                        ? "Đã hủy"
                        : invoiceById?.status === 7
                        ? "Yêu cầu hủy đơn"
                        : "",
                createdAt: GFormatDate(
                    invoiceById?.created_at,
                    "DD-MM-YYYY | HH:mm"
                ),
            });
        }
    }, [invoiceById, invoiceById?.status]);
    useEffect(() => {
        const fetch = async () => {
            if (deliveryByInvoiceId) {
                const provinceSelected = await getProvinceById(
                    deliveryByInvoiceId?.province,
                    provinces
                );
                setSelectedProvince(provinceSelected);

                await districtApi(parseInt(deliveryByInvoiceId?.province)).then(
                    (districtList) => {
                        const districtSelected = getDistrictById(
                            deliveryByInvoiceId?.district,
                            districtList
                        );
                        setSelectedDistrict(districtSelected);
                    }
                );

                await wardApi(parseInt(deliveryByInvoiceId?.district)).then(
                    (wardList) => {
                        const wardSelected = getWardById(
                            deliveryByInvoiceId?.ward,
                            wardList
                        );
                        setSelectedWard(wardSelected);
                    }
                );

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
        };
        fetch();
    }, [deliveryByInvoiceId, invoiceId]);

    // Delete confirm modal
    const [isOpenCancelConfirmPopup, setIsOpenCancelConfirmPopup] =
        useState(false);

    const handleOpenCancelConfirmPopup = (rowData) => {
        setIsOpenCancelConfirmPopup(true);
    };

    const handleCloseCancelConfirmPopup = () => {
        setIsOpenCancelConfirmPopup(false);
    };
    const handleBack = () => {
        navigate("/don-mua");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                    Trở lại
                </GButton>
                <div className={cx("invoice-wrapper")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("invoice-header")}>
                                <h3
                                    className={cx("invoice-code")}
                                >{`Đơn hàng #${invoiceId}`}</h3>
                                {invoiceClone?.status < 4 && (
                                    <GButton
                                        color={"error"}
                                        onClick={handleOpenCancelConfirmPopup}
                                    >
                                        Hủy đơn hàng
                                    </GButton>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("invoice-info")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            <h3>Thông tin đơn hàng</h3>
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
                                                {invoiceClone?.createdAt}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Trạng thái đơn hàng:{" "}
                                            <span
                                                className={
                                                    invoiceClone?.status === 1
                                                        ? cx("pending")
                                                        : invoiceClone?.status ===
                                                          2
                                                        ? cx("received")
                                                        : invoiceClone?.status ===
                                                          3
                                                        ? cx("product-waiting")
                                                        : invoiceClone?.status ===
                                                          4
                                                        ? cx("delivering")
                                                        : invoiceClone?.status ===
                                                          5
                                                        ? cx("delivered")
                                                        : invoiceClone?.status ===
                                                          6
                                                        ? cx("cancel")
                                                        : invoiceClone?.status ===
                                                          7
                                                        ? cx("cancel-pending")
                                                        : ""
                                                }
                                            >
                                                {invoiceClone?.statusName}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Phương thức thanh toán:{" "}
                                            <span>
                                                {
                                                    deliveryClone?.paymentMethodName
                                                }
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Đơn vị vận chuyển:{" "}
                                            <span>
                                                {invoiceClone?.status === 6
                                                    ? "--"
                                                    : deliveryClone?.delivery_unit
                                                    ? deliveryClone?.delivery_unit
                                                    : "--"}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Mã vận đơn:{" "}
                                            <span>
                                                {invoiceClone?.status === 6
                                                    ? "--"
                                                    : deliveryClone?.delivery_code
                                                    ? deliveryClone?.delivery_code
                                                    : "--"}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Ghi chú:{" "}
                                            <span>
                                                {invoiceClone?.note
                                                    ? invoiceClone?.note
                                                    : "--"}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("invoice-customer-info")}>
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
                                                {deliveryClone?.customer_name}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            {" "}
                                            Số điện thoại:{" "}
                                            <span>
                                                {deliveryClone?.customer_phone}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Địa chỉ giao hàng:{" "}
                                            <span>
                                                {invoiceClone?.status === 6
                                                    ? "--"
                                                    : `${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            Địa chỉ giao hàng chi tiết:{" "}
                                            <span>
                                                {invoiceClone?.status === 6
                                                    ? "--"
                                                    : deliveryClone?.detail_address}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("invoice-product-info")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={cx("info-item")}>
                                            <h3>Thông tin sản phẩm</h3>
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
                                                    title: "Tên sản phẩm",
                                                    field: "product_name",
                                                    hidden: isSmall
                                                        ? true
                                                        : false,
                                                    render: (rowData) => {
                                                        return (
                                                            <>
                                                                <span
                                                                    className={cx(
                                                                        "product_name"
                                                                    )}
                                                                >
                                                                    {
                                                                        rowData?.product_name
                                                                    }
                                                                </span>
                                                            </>
                                                        );
                                                    },
                                                },
                                                {
                                                    title: "Số lượng",
                                                    field: "product_quantity",
                                                    hidden: isSmall
                                                        ? true
                                                        : false,
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
                                                                <span
                                                                    className={
                                                                        rowData?.unit_price_onsale
                                                                            ? cx(
                                                                                  "unit_price",
                                                                                  "onsale"
                                                                              )
                                                                            : cx(
                                                                                  "unit_price"
                                                                              )
                                                                    }
                                                                >
                                                                    {FormatCurrency(
                                                                        rowData?.unit_price
                                                                    )}
                                                                </span>
                                                                {rowData?.unit_price_onsale ? (
                                                                    <span
                                                                        className={cx(
                                                                            "unit_price_onsale"
                                                                        )}
                                                                    >
                                                                        {FormatCurrency(
                                                                            rowData?.unit_price_onsale
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    ""
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
                                                                    "table_product_info"
                                                                )}
                                                            >
                                                                <span
                                                                    className={cx(
                                                                        "table_product_name"
                                                                    )}
                                                                >
                                                                    {
                                                                        rowData?.product_name
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "table_product_quantity"
                                                                    )}
                                                                >
                                                                    SL:{" "}
                                                                    <span>
                                                                        {
                                                                            rowData?.product_quantity
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "table_product_price"
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
                                            data={productListClone}
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
                                                            priceTotal
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={cx("costs")}>
                                                    Phí vận chuyển:{" "}
                                                    <span>
                                                        {priceTotal > 500000
                                                            ? FormatCurrency(0)
                                                            : FormatCurrency(
                                                                  30000
                                                              )}
                                                    </span>
                                                </div>
                                                <div className={cx("total")}>
                                                    Tổng tiền:{" "}
                                                    <span>
                                                        {FormatCurrency(
                                                            invoiceClone?.price_total
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
            <ConfirmCancelOrderPopup
                isOpen={isOpenCancelConfirmPopup}
                handleClose={handleCloseCancelConfirmPopup}
                handleOpen={handleOpenCancelConfirmPopup}
                invoice={{ invoiceId: invoiceId, status: invoiceClone?.status }}
            />
        </div>
    );
}

export default OrderDetail;
