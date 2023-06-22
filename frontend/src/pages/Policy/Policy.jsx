import React from "react";
import classNames from "classnames/bind";
import styles from "./Policy.module.scss";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

function Policy() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("invoice")}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={12}>
                                    <h3>
                                        [Đơn hàng] Tôi có thể hủy đơn hàng
                                        không?
                                    </h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <h5 className={cx("sub-title")}>
                                            1. Người mua chỉ CÓ thể hủy đơn khi:
                                        </h5>
                                        <ul className={cx("content-list")}>
                                            <li>
                                                Đơn hàng đang ở trạng thái Chờ
                                                xác nhận (Người bán chưa xác
                                                nhận đơn)
                                            </li>
                                            <li>
                                                Khi đơn hàng ở trạng thái Đã
                                                tiếp nhận, Chờ lấy hàng (Người
                                                bán đã tiếp nhận đơn hoặc đang
                                                đóng gói và chuẩn bị giao cho
                                                đơn vị vận chuyển), yêu cầu sẽ
                                                cần được Người bán phản hồi:
                                            </li>
                                            <ul
                                                className={cx(
                                                    "children-content-list"
                                                )}
                                            >
                                                <li>
                                                    Người bán chấp nhận yêu cầu
                                                    hủy đơn: Đơn hàng sẽ được
                                                    hủy ngay lập tức
                                                </li>
                                                <li>
                                                    Người bán từ chối yêu cầu
                                                    hủy đơn: Đơn hàng sẽ tiếp
                                                    tục được xử lý. Người mua
                                                    không thể hủy trong trường
                                                    hợp này dù có liên hệ bộ
                                                    phận CSKH
                                                </li>
                                            </ul>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <h5 className={cx("sub-title")}>
                                            2. Người mua KHÔNG thể hủy đơn nếu:
                                        </h5>
                                        <ul className={cx("content-list")}>
                                            <li>Đơn hàng Đang giao</li>
                                            <li>
                                                Hệ thống không còn hiển thị nút
                                                Hủy đơn hàng
                                            </li>
                                            <li>
                                                Người bán không đồng ý yêu cầu
                                                hủy khi đơn hàng ở trạng thái
                                                Chờ lấy hàng
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <hr
                            style={{
                                borderTop: "1px solid var(--primary-400)",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("invoice")}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={12}>
                                    <h3>
                                        [Lịch hẹn] Tôi có thể hủy lịch hẹn
                                        không?
                                    </h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <h5 className={cx("sub-title")}>
                                            1. Người đặt lịch chỉ CÓ thể hủy
                                            lịch hẹn khi:
                                        </h5>
                                        <ul className={cx("content-list")}>
                                            <li>
                                                Lịch hẹn đang ở trạng thái Chờ
                                                xác nhận (Người bán chưa xác
                                                nhận đơn)
                                            </li>
                                            <li>
                                                Khi lịch hẹn ở trạng thái Đã
                                                tiếp nhận (Người quản lý tiếp
                                                nhận lịch hẹn để xử lý), yêu cầu
                                                sẽ cần được Người quản lý phản
                                                hồi:
                                            </li>
                                            <ul
                                                className={cx(
                                                    "children-content-list"
                                                )}
                                            >
                                                <li>
                                                    Người quản lý chấp nhận yêu
                                                    cầu hủy lịch hẹn: Lịch hẹn
                                                    sẽ được hủy ngay lập tức.
                                                </li>
                                                <li>
                                                    Người quản lý từ chối yêu
                                                    cầu hủy lịch hẹn: Lịch hẹn
                                                    sẽ tiếp tục được xử lý.
                                                    Người đặt lịch không thể hủy
                                                    trong trường hợp này dù có
                                                    liên hệ bộ phận CSKH.
                                                </li>
                                            </ul>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <h5 className={cx("sub-title")}>
                                            2. Người đặt lịch KHÔNG thể hủy lịch
                                            hẹn nếu:
                                        </h5>
                                        <ul className={cx("content-list")}>
                                            <li>
                                                Lịch hẹn đã được xử lý và lên
                                                lịch
                                            </li>
                                            <li>
                                                Hệ thống không còn hiển thị nút
                                                Hủy lịch hẹn
                                            </li>
                                            <li>
                                                Người quản lý không đồng ý yêu
                                                cầu hủy khi lịch hẹn ở trạng
                                                thái Đã tiếp nhận
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Policy;
