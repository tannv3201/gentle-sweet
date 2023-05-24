import React, { useEffect } from "react";
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
import { useFormikContext } from "formik";
const cx = classNames.bind(styles);

function PaymentInformation() {
    const [methodChecked, setMethodChecked] = useState("1");
    const { setFieldValue } = useFormikContext();

    const handleMethodChecked = (e) => {
        setMethodChecked(e.target.value);
    };
    useEffect(() => {
        if (methodChecked) {
            setFieldValue("payment_method", methodChecked);
        }
    }, [methodChecked, setFieldValue]);

    console.log(methodChecked);

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
                                                defaultValue="1"
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
                                                                value="1"
                                                                name="cod"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="Thanh toán khi nhận hàng"
                                                                defaultChecked
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
                                                                value="2"
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
                                                                value="3"
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
