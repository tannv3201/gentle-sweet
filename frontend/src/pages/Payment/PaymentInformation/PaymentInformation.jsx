import React from "react";
import styles from "./PaymentInformation.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import BankTransferMethod from "./BankTransferMethod/BankTransferMethod";
import EWallet from "./EWallet/EWallet";
const cx = classNames.bind(styles);

function PaymentInformation() {
    const [methodChecked, setMethodChecked] = useState("");

    const handleMethodChecked = (e) => {
        setMethodChecked(e.target.value);
    };

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
                                                onChange={handleMethodChecked}
                                                value={methodChecked}
                                            >
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "method-item"
                                                            )}
                                                        >
                                                            <FormControlLabel
                                                                value="cod"
                                                                name="cod"
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
                                                                value="bankTransfer"
                                                                name="bankTransfer"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Chuyển khoản qua thẻ ngân hàng"
                                                            />
                                                            <BankTransferMethod
                                                                methodChecked={
                                                                    methodChecked
                                                                }
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
                                                                value="eWallet"
                                                                name="eWallet"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Ví điện tử"
                                                            />
                                                            <EWallet
                                                                methodChecked={
                                                                    methodChecked
                                                                }
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
