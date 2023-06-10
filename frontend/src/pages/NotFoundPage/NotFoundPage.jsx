import React from "react";
import styles from "./NotFoundPage.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GButton from "../../components/MyButton/MyButton";
import { UndoRounded } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function NotFoundPage() {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/");
    };
    return (
        <div className={cx("wrapper")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className={cx("not-found-reminder")}>
                        <span>
                            Oops! Trang bạn đang cố gắng truy cập không được tìm
                            thấy.
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
                <Grid item xs={6}>
                    <div className={cx("not-found-img")}>
                        <img src={images.notFoundPage} alt="" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default NotFoundPage;
