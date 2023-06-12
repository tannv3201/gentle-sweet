import React from "react";
import classNames from "classnames/bind";
import styles from "./SalonSystemPage.module.scss";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import SalonSystem from "../../common/SalonSystem/SalonSystem";
const cx = classNames.bind(styles);

function SalonSystemPage() {
    return (
        <>
            {/* <div className={cx("banner-img")}>
                <img src={images.banner_salon_system} alt="" />
            </div> */}
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={cx("introduce-title")}>
                            <h2>
                                Gentle Beauty - Với hơn 10 chi nhánh tại 6 tỉnh
                                thành phố trên cả nước
                            </h2>
                        </Grid>
                        <Grid item xs={12}>
                            <p className={cx("introduce-description")}>
                                Hệ thống spa Gentle là một trong những thương
                                hiệu spa nổi tiếng tại Việt Nam với hơn 10 chi
                                nhánh tại 6 tỉnh thành phố trên cả nước. Gentle
                                tự hào sở hữu đội ngũ nhân sự chuyên nghiệp và
                                tận tâm với nhiều năm kinh nghiệm trong lĩnh vực
                                chăm sóc sức khỏe và sắc đẹp. Với phương châm
                                "Sức khỏe và sắc đẹp từ thiên nhiên", Gentle cam
                                kết sử dụng những sản phẩm được chiết xuất hoàn
                                toàn từ thiên nhiên để mang đến cho khách hàng
                                những trải nghiệm tuyệt vời và đem lại sự thư
                                giãn tuyệt đối cho cơ thể và tinh thần. Bất kể
                                chi nhánh nào của Gentle, khách hàng đều có thể
                                tin tưởng vào chất lượng dịch vụ và sự tận tâm
                                của đội ngũ nhân viên tại đây.
                            </p>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <SalonSystem searchNearYou={true} />
        </>
    );
}

export default SalonSystemPage;
