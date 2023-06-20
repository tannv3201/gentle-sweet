import React from "react";
import styles from "./EWallet.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import images from "../../../../assets/images";
const cx = classNames.bind(styles);

function EWallet({ methodChecked, bankTransferContent }) {
    return (
        <>
            <div
                className={
                    methodChecked === "3"
                        ? cx("method-e-wallet", "isChecked")
                        : cx("method-e-wallet")
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("e-wallet-information")}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <span
                                        className={cx(
                                            "e-wallet-information-title"
                                        )}
                                    >
                                        <h3>Thông tin ví điện tử</h3>
                                    </span>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <span className={cx("information-title")}>
                                        Zalo Pay:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            0399.859.634
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <span className={cx("information-title")}>
                                        Momo:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            0399.859.634
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <span className={cx("information-title")}>
                                        Chủ tài khoản:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            NGUYỄN VĂN TÂN
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <span className={cx("information-title")}>
                                        Nội dung chuyển khoản:{" "}
                                    </span>
                                    <span className={cx("information-content")}>
                                        {bankTransferContent}
                                    </span>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <div className={cx("contact-information")}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <span
                                        className={cx(
                                            "e-wallet-information-title"
                                        )}
                                    >
                                        <h3>Thông tin liên hệ</h3>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={cx("information-title")}>
                                        Quản lý:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            Nguyễn Thị Bích Loan
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={cx("information-title")}>
                                        Số điện thoại:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            0399859634
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={cx("information-title")}>
                                        Facebook:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            facebook.com/GentleSweetSpa
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={cx("information-title")}>
                                        Instagram:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            instagram.com/@gentlesweetspa
                                        </span>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={cx("information-title")}>
                                        Địa chỉ:{" "}
                                        <span
                                            className={cx(
                                                "information-content"
                                            )}
                                        >
                                            Gentle - 175, Tây Sơn, Đống Đa, Hà
                                            Nội
                                        </span>
                                    </span>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid> */}
                </Grid>
            </div>
        </>
    );
}

export default EWallet;
