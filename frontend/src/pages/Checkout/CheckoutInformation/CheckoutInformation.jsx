import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GButton from "../../../components/MyButton/MyButton";
import classNames from "classnames/bind";
import styles from "./CheckoutInformation.module.scss";
import CustommerInformation from "./CustomerInformation/CustomerInformation";
import ProductInformation from "./ProductInformation/ProductInformation";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

const InfoGroup = ({ label, title, linkTo }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label
                style={{
                    fontSize: "1.4rem",
                    textTransform: "uppercase",
                    color: "rgba(0, 0, 0, 0.38)",
                    fontWeight: "var(--fw-semi-bold)",
                    marginBottom: "2px",
                }}
                htmlFor=""
            >
                {label}
            </label>
            {!linkTo ? (
                <span
                    style={{
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                        fontWeight: "var(--fw-medium)",
                    }}
                >
                    {title}
                </span>
            ) : (
                <a
                    style={{
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                        fontWeight: "var(--fw-medium)",
                    }}
                    href={linkTo}
                    target="_blank"
                    rel="noreferrer"
                >
                    {title}
                </a>
            )}
        </div>
    );
};

export default function CheckoutInformation() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CustommerInformation />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductInformation />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("contact-wrapper")}>
                            <Grid container spacing={2}>
                                {" "}
                                <Grid item xs={12}>
                                    <div className={cx("contact-info")}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "contact-info-title"
                                                    )}
                                                >
                                                    Thông tin liên hệ Gentle
                                                    Beauty
                                                </span>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InfoGroup
                                                    label="SPA"
                                                    title="Gentle Beauty"
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <InfoGroup
                                                    label="Hotlines"
                                                    title="1900 8198"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InfoGroup
                                                    label="Facebook"
                                                    title="Gentle Beauty"
                                                    linkTo="https://www.facebook.com/nheoSoSweet/"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InfoGroup
                                                    label="Instagram"
                                                    title="Gentle Beauty"
                                                    linkTo="https://www.instagram.com/nheososweet/"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <InfoGroup
                                                    label="Email"
                                                    title="spa.gentlebeauty@gmail.com"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <InfoGroup
                                                    label="Trụ sở chính"
                                                    title="175, Tây Sơn, Đống Đa, Hà Nội"
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <article className={cx("thanks")}>
                                        Chúng tôi xin chân thành cảm ơn quý
                                        khách đã đặt lịch dịch vụ của chúng tôi.
                                        Chúng tôi sẽ sớm liên hệ lại với quý
                                        khách để xác nhận lịch hẹn. Nếu quý
                                        khách có bất kỳ câu hỏi hoặc yêu cầu hỗ
                                        trợ nào, vui lòng liên hệ với chúng tôi
                                        theo thông tin bên trên. Một lần nữa,
                                        chúng tôi cảm ơn quý khách đã tin tưởng
                                        và sử dụng dịch vụ của chúng tôi.
                                    </article>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("action-btn-wrapper")}>
                            <GButton color="success" className={cx("save-btn")}>
                                Lưu
                            </GButton>
                        </div>
                    </Grid>
                </Grid>
                {/* <StepperConfirm /> */}
            </div>
        </div>
    );
}
