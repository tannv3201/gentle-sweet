import React from "react";
import classNames from "classnames/bind";
import styles from "./VisionMission.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

function VisionMission() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("vision-content")}>
                            <h1 className={cx("vision-title")}>Tầm nhìn</h1>
                            <p className={cx("vision-description")}>
                                Gentle đem lại niềm tự hào cho dân tộc Việt Nam.
                                Biến việc làm đẹp trở thành nét văn hóa hành xử
                                mỗi ngày với vô vàn địa điểm thuận tiện.
                            </p>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("vision-img")}>
                            <img src={images.vision_img} alt="" />
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction={isSmall ? "column-reverse" : undefined}
                >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("mission-img")}>
                            <img src={images.mission_img} alt="" />
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("mission-content")}>
                            <h1 className={cx("mission-title")}>Sứ mệnh</h1>
                            <ul className={cx("mission-description")}>
                                <li>
                                    <h3>VỚI KHÁCH HÀNG </h3>
                                    Giúp người PHỤ NỮ Á ĐÔNG SẮC – VÓC VẸN TOÀN,
                                    HẠNH PHÚC VIÊN MÃN.
                                </li>
                                <li>
                                    <h3>VỚI NHÂN VIÊN</h3>
                                    Xây dựng một môi trường làm việc chuyên
                                    nghiệp, bình đẳng, tạo cơ hội nâng cao
                                    nghiệp vụ và phát triển sự nghiệp cho mọi
                                    thành viên.
                                </li>
                                <li>
                                    <h3>VỚI CỘNG ĐỒNG</h3>
                                    Lan tỏa giá trị cuộc sống “Đẹp để hạnh phúc
                                    – Biết ơn & yêu thương”.
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default VisionMission;
