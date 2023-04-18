import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GButton from "../../../components/MyButton/MyButton";
import classNames from "classnames/bind";
import styles from "./StepperBooking.module.scss";
import StepperInformation from "./StepperInformation/StepperInformation";
import StepperService from "./StepperService/StepperService";
import StepperConfirm from "./StepperConfirm/StepperConfirm";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

const steps = [
    {
        label: "Thông tin",
        description: "Thông tin cá nhân",
        component: <StepperInformation />,
    },
    {
        label: "Dịch vụ",
        description: "Thông tin dịch vụ",
        component: <StepperService />,
    },
    {
        label: "Xác nhận",
        description: "Xác nhận",
        component: <StepperConfirm />,
    },
];
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

export default function StepperBooking() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
        console.log(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                {/* <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index} completed={completed[index]}>
                            <StepButton onClick={handleStep(index)}>
                                {label?.label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Bạn đã nhập và xác nhận thông tin thành công,
                                vui lòng chọn thao tác Đặt lịch để hoàn tất.
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: "1 1 auto" }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography
                                sx={{ mt: 2, mb: 1, py: 1 }}
                                component={"div"}
                            >
                                {steps[activeStep]?.component}
                                {activeStep !== steps.length &&
                                    completed[activeStep] && (
                                        <span
                                            style={{
                                                fontStyle: "italic",
                                                marginTop: "8px",
                                                display: "inline-block",
                                            }}
                                        >
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>{" "}
                                            Đã nhập đầy đủ thông tin!
                                        </span>
                                    )}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent={"space-between"}
                                    // direction={
                                    //     isSmall ? "column-reverse" : undefined
                                    // }
                                >
                                    {activeStep !== 0 && (
                                        <Grid item lg={4}>
                                            <GButton
                                                // disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                                variant="outlined"
                                            >
                                                Trở lại
                                            </GButton>
                                        </Grid>
                                    )}
                                    <Grid item lg={4}>
                                        <div
                                            style={
                                                activeStep !== 0
                                                    ? {
                                                          display: "flex",
                                                          justifyContent:
                                                              "flex-end",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <GButton
                                                onClick={handleNext}
                                                sx={{ mr: 1 }}
                                            >
                                                Tiếp theo
                                            </GButton>
                                        </div>
                                    </Grid>
                                    {activeStep !== steps.length &&
                                        !completed[activeStep] && (
                                            <Grid item lg={4} sm={12} xs={12}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                    }}
                                                >
                                                    <GButton
                                                        onClick={handleComplete}
                                                        color="success"
                                                    >
                                                        {completedSteps() ===
                                                        totalSteps() - 1
                                                            ? "Xác nhận "
                                                            : "Hoàn thành bước này"}
                                                    </GButton>
                                                </div>
                                            </Grid>
                                        )}
                                </Grid>
                            </Box>
                        </React.Fragment>
                    )}
                </div> */}

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <StepperInformation />
                    </Grid>
                    <Grid item xs={12}>
                        <StepperService />
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
