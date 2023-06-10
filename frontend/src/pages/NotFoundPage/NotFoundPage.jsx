import React from "react";
import styles from "./NotFoundPage.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GButton from "../../components/MyButton/MyButton";
import { UndoRounded } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

function NotFoundPage() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/");
    };
    return (
        <div className={cx("wrapper")}>
            {!isSmall ? (
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("not-found-reminder")}>
                            <span>
                                Oops!
                                <br /> Trang bạn đang cố gắng truy cập không
                                được tìm thấy.
                            </span>
                            <div className={cx("back-to-home")}>
                                <GButton
                                    onClick={handleBackToHome}
                                    startIcon={<UndoRounded />}
                                    variant="outlined"
                                >
                                    Quay lại trang chủ
                                </GButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("not-found-img")}>
                            <img src={images.notFoundPage} alt="" />
                        </div>
                    </Grid>
                </Grid>
            ) : (
                <div className={cx("not-found-page-mobile")}>
                    <div className={cx("not-found-img-mobile")}>
                        <img src={images?.notFoundPageMobile} alt="" />
                    </div>
                    <div className={cx("not-found-reminder-mobile")}>
                        Oops!
                        <br /> Trang bạn đang cố gắng truy cập không được tìm
                        thấy.
                    </div>
                    <div className={cx("back-to-home")}>
                        <GButton
                            onClick={handleBackToHome}
                            startIcon={<UndoRounded />}
                            variant="outlined"
                        >
                            Quay lại trang chủ
                        </GButton>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotFoundPage;
