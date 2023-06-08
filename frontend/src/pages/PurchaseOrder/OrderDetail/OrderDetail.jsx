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
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { API_IMAGE_URL } from "../../../LocalConstants";
import ConfirmCancelOrderPopup from "../ConfirmCancelOrderPopup/ConfirmCancelOrderPopup";
import { ArrowBackIosNew } from "@mui/icons-material";

const cx = classNames.bind(styles);

function OrderDetail() {
    const { invoiceId } = useParams();
    const [invoiceClone, setInvoiceClone] = useState({});
    const [deliveryClone, setDeliveryClone] = useState({});
    const [productListClone, setProductListClone] = useState([]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const invoiceById = useSelector((state) => state.invoice.invoice?.invoice);
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );
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
    }, [getInvoiceDetail]);

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
        if (productListClone) {
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
        }
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
                    "DD-MM-YYYY HH:mm"
                ),
            });
        }
    }, [invoiceById]);
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
                                                {deliveryClone?.delivery_unit
                                                    ? deliveryClone?.delivery_unit
                                                    : "--"}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className={cx("info-item")}>
                                            Mã vận đơn:{" "}
                                            <span>
                                                {deliveryClone?.delivery_code
                                                    ? deliveryClone?.delivery_code
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
                                                {deliveryClone?.detail_address}
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
                                        {productListClone?.map(
                                            (product, idx) => (
                                                <div
                                                    key={idx}
                                                    className={cx(
                                                        "product-item"
                                                    )}
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item lg={3}>
                                                            <div
                                                                className={cx(
                                                                    "product-image"
                                                                )}
                                                            >
                                                                <img
                                                                    src={`${API_IMAGE_URL}/${product?.image_url}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={9}
                                                            display={"flex"}
                                                            flexDirection={
                                                                "column"
                                                            }
                                                            justifyContent={
                                                                "center"
                                                            }
                                                        >
                                                            <div>
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        lg={6}
                                                                        md={6}
                                                                        sm={12}
                                                                        xs={12}
                                                                        display={
                                                                            "flex"
                                                                        }
                                                                        alignItems={
                                                                            "center"
                                                                        }
                                                                    >
                                                                        {
                                                                            product?.product_name
                                                                        }
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        lg={3}
                                                                        md={3}
                                                                        sm={6}
                                                                        xs={6}
                                                                        display={
                                                                            "flex"
                                                                        }
                                                                        alignItems={
                                                                            "center"
                                                                        }
                                                                    >
                                                                        Số
                                                                        lượng:{" "}
                                                                        {
                                                                            product?.product_quantity
                                                                        }
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        lg={3}
                                                                        md={3}
                                                                        sm={6}
                                                                        xs={6}
                                                                        display={
                                                                            "flex"
                                                                        }
                                                                        alignItems={
                                                                            "center"
                                                                        }
                                                                    >
                                                                        {FormatCurrency(
                                                                            product?.unit_price
                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            )
                                        )}
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
                                                            invoiceClone?.provisional_price
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={cx("costs")}>
                                                    Phí vận chuyển:{" "}
                                                    <span>
                                                        {FormatCurrency(15000)}
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
