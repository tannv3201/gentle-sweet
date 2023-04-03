import React from "react";
import styles from "./HomeBlog.module.scss";
import classNames from "classnames/bind";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
import { Grid } from "@material-ui/core";

const cx = classNames.bind(styles);

const newsList = [
    {
        image: images.hair_care_service,
        label: 'Bộ sưu tập "Mùa hè rực rỡ"',
        desciption:
            'Chúng tôi cho ra mắt bộ sưu tập "Mùa hè rực rỡ" từ ngày 01/04/2023',
    },
    {
        image: images.hair_care_service,
        label: 'Bộ sưu tập "Mùa hè rực rỡ"',
        desciption:
            'Chúng tôi cho ra mắt bộ sưu tập "Mùa hè rực rỡ" từ ngày 01/04/2023',
    },
];

const tipsList = [
    {
        image: images.hair_care_service,
        label: "Cách dưỡng móng",
        desciption:
            'Chúng tôi cho ra mắt bộ sưu tập "Mùa hè rực rỡ" từ ngày 01/04/2023',
    },
    {
        image: images.hair_care_service,
        label: "Hướng dẫn trị gàu",
        desciption:
            'Chúng tôi cho ra mắt bộ sưu tập "Mùa hè rực rỡ" từ ngày 01/04/2023',
    },
];

function HomeBlog() {
    return (
        <div className={cx("home-blog-wrapper")}>
            <div className={cx("home-blog-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={6} container spacing={3}>
                        <Grid item xs={12} className={cx("news-title")}>
                            <h2>Tin tức</h2>
                        </Grid>
                        {newsList.map((news, index) => (
                            <Grid key={index} item xs={6}>
                                <a href="#" className={cx("news-container")}>
                                    <div className={cx("news-img")}>
                                        <img src={news?.image} alt="" />
                                    </div>
                                    <div className={cx("news-text")}>
                                        <h3 className={cx("news-label")}>
                                            {news?.label}
                                        </h3>
                                        <p className={cx("news-description")}>
                                            {news?.desciption}
                                        </p>
                                    </div>
                                </a>
                            </Grid>
                        ))}
                        <Grid item xs={12} className={cx("news-more")}>
                            <a href="#">Xem thêm</a>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container spacing={3}>
                        <Grid item xs={12} className={cx("tips-title")}>
                            <h2>Tips làm đẹp</h2>
                        </Grid>
                        {tipsList.map((tips, index) => (
                            <Grid key={index} item xs={6}>
                                <a href="#" className={cx("tips-container")}>
                                    <div className={cx("tips-img")}>
                                        <img src={tips?.image} alt="" />
                                    </div>
                                    <div className={cx("tips-text")}>
                                        <h3 className={cx("tips-label")}>
                                            {tips?.label}
                                        </h3>
                                        <p className={cx("tips-description")}>
                                            {tips?.desciption}
                                        </p>
                                    </div>
                                </a>
                            </Grid>
                        ))}
                        <Grid item xs={12} className={cx("tips-more")}>
                            <a href="#">Xem thêm</a>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default HomeBlog;
