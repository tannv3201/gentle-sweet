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
import { generateBankTransferContent } from "../../../utils/generateBankTransferContent";
const cx = classNames.bind(styles);

function PaymentInformation() {
    const [methodChecked, setMethodChecked] = useState("1");
    const { setFieldValue } = useFormikContext();

    const handleMethodChecked = (e) => {
        setMethodChecked(e.target.value);
    };

    const [genBankTransferContent, setGenBankTransferContent] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const transactionContent = generateBankTransferContent();

            setGenBankTransferContent(transactionContent);
        };
        fetch();
    }, []);
    useEffect(() => {
        if (methodChecked) {
            setFieldValue("payment_method", methodChecked);
            if (parseInt(methodChecked) !== 1) {
                setFieldValue("bank_transfer_content", genBankTransferContent);
                console.log(genBankTransferContent);
            }
        }
    }, [genBankTransferContent, methodChecked, setFieldValue]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={cx("payment-method")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span>
                                        <h3>Phương thức thanh toán</h3>
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
                                                                bankTransferContent={
                                                                    genBankTransferContent
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
                                                                bankTransferContent={
                                                                    genBankTransferContent
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
