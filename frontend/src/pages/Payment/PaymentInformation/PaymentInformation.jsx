import React from "react";
import styles from "./PaymentInformation.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import MyRadio from "../../../components/MyRadio/MyRadio";
import { useState } from "react";
import GTextField from "../../../components/GTextField/GTextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const cx = classNames.bind(styles);

function PaymentInformation() {
    const [isOpenMethod, setIsOpenMethod] = useState({
        cashPayment: false,
        transferPayment: false,
    });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={cx("payment-method")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span>
                                        <h3>Lựa chọn phương thức thanh toán</h3>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("method-list")}>
                                        <FormControl fullWidth>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                            >
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "method-item"
                                                            )}
                                                        >
                                                            <FormControlLabel
                                                                value="cash"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Thanh toán khi nhận hàng"
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "method-item"
                                                            )}
                                                        >
                                                            <FormControlLabel
                                                                value="transfer"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Chuyển khoản"
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "method-item"
                                                            )}
                                                        >
                                                            <FormControlLabel
                                                                value="qrcode"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Quét mã QR"
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
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

export default PaymentInformation;
