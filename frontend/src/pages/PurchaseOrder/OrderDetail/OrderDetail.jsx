import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getInvoiceById } from "../../../redux/api/apiInvoice";

const cx = classNames.bind(styles);

function OrderDetail() {
    const { invoiceId } = useParams();
    const [invoiceClone, setInvoiceClone] = useState({});
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Get invoice
    useEffect(() => {
        const fetch = async () => {
            await getInvoiceById(
                dispatch,
                invoiceId,
                user?.accessToken,
                axiosJWT
            );
        };
        fetch();
    }, [invoiceId]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("invoice-header")}>
                            <h3
                                className={cx("invoice-code")}
                            >{`Đơn hàng #${invoiceId}`}</h3>
                            <GButton>Hủy đơn hàng</GButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("invoice-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div>
                                        <h3>Thông tin đơn hàng</h3>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    Người tạo:{" "}
                                    <span>{`Khách hàng - ${
                                        user?.last_name + " " + user?.first_name
                                    }`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Ngày tạo: <span>{`06-06-2023`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Trạng thái đơn hàng:{" "}
                                    <span>{`Đã xác nhận`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Trạng thái giao hàng:{" "}
                                    <span>{`Đang chuẩn bị hàng`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Phương thức thanh toán:{" "}
                                    <span>{`Thanh toán khi nhận hàng`}</span>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("invoice-customer-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div>
                                        <h3>Thông tin khách hàng</h3>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    Tên khách hàng:{" "}
                                    <span>{`Nguyễn Văn Tân`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Số điện thoại: <span>{`0386653766`}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    Địa chỉ giao hàng:{" "}
                                    <span>{`Xóm 6, Kha Lý, Thụy Quỳnh, Thái Thụy, Thái Bình`}</span>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("invoice-product-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div>
                                        <h3>Thông tin sản phẩm</h3>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    Tên sản phẩm - số lượng - giá tiền
                                </Grid>{" "}
                                <Grid item xs={12}>
                                    Tổng tiền:
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default OrderDetail;
