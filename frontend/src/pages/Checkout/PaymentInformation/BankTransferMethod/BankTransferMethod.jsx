import React from "react";
import styles from "./BankTransferMethod.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";

import images from "../../../../assets/images";
const cx = classNames.bind(styles);

function BankTransferMethod({ methodChecked, bankTransferContent }) {
    return (
        <>
            <div
                className={
                    methodChecked === "2"
                        ? cx("method-bank-transfer", "isChecked")
                        : cx("method-bank-transfer")
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("transfer-information")}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <span
                                        className={cx(
                                            "transfer-information-title"
                                        )}
                                    >
                                        <h3>Thông tin ngân hàng</h3>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "information-title"
                                                    )}
                                                >
                                                    Ngân hàng:{" "}
                                                    <span
                                                        className={cx(
                                                            "information-content"
                                                        )}
                                                    >
                                                        Ngân hàng Quân đội(MB)
                                                    </span>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "information-title"
                                                    )}
                                                >
                                                    Số tài khoản:{" "}
                                                    <span
                                                        className={cx(
                                                            "information-content"
                                                        )}
                                                    >
                                                        789403022001
                                                    </span>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "information-title"
                                                    )}
                                                >
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
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "information-title"
                                                    )}
                                                >
                                                    Chi nhánh:{" "}
                                                    <span
                                                        className={cx(
                                                            "information-content"
                                                        )}
                                                    >
                                                        Chi nhánh Thái Thụy,
                                                        Thái Bình.
                                                    </span>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "information-title"
                                                    )}
                                                >
                                                    Nội dung chuyển khoản:{" "}
                                                </span>
                                                <span
                                                    className={cx(
                                                        "information-content"
                                                    )}
                                                >
                                                    {bankTransferContent}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </div>
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
                                            "transfer-information-title"
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

export default BankTransferMethod;
