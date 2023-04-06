import React from "react";
import styles from "./HomeBlog.module.scss";
import classNames from "classnames/bind";
import images from "../../../assets/images";
import { Grid } from "@material-ui/core";
import {
    EmojiObjectsRounded,
    AnnouncementRounded,
    ArrowForwardRounded,
} from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
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
            'Chúng tôi cho ra mắt bộ sưu tập "Mùa hè rực rỡ" từ ngày 01/04/2024',
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

function BlogItem({ imageSrc, title, description }) {
    return (
        <a href="#" className={cx("blog-item-container")}>
            <div className={cx("blog-item-img")}>
                <img src={imageSrc} alt="" />
            </div>
            <div className={cx("blog-item-text")}>
                <h3 className={cx("blog-item-label")}>{title}</h3>
                <p className={cx("blog-item-description")}>{description}</p>
            </div>
        </a>
    );
}

function HomeBlog() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div className={cx("home-blog-wrapper")}>
            <div className={cx("home-blog-inner")}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} sm={12}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    className={cx("blog-title")}
                                >
                                    <h2>
                                        Tin tức
                                        <AnnouncementRounded
                                            style={{ marginLeft: "8px" }}
                                        />
                                    </h2>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    className={cx("blog-sub-title")}
                                >
                                    <p>
                                        Cập nhật các tin tức mới nhất từ chúng
                                        tôi.
                                    </p>
                                </Grid>
                                {newsList.map((news, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                    >
                                        <BlogItem
                                            imageSrc={news?.image}
                                            title={news?.label}
                                            description={news?.desciption}
                                        />
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <a
                                            href="#"
                                            className={cx("see-more-btn")}
                                        >
                                            <span>Xem thêm</span>
                                            <ArrowForwardRounded />
                                        </a>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    {isMedium && (
                        <div
                            style={{
                                height: "1px",
                                width: "100%",
                                margin: "32px 0",
                                backgroundColor: "var(--primary-box-shadow)",
                            }}
                        />
                    )}
                    <Grid item lg={6} md={12} sm={12}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} className={cx("blog-title")}>
                                    <h2>
                                        Tips làm đẹp
                                        <EmojiObjectsRounded
                                            style={{ marginLeft: "8px" }}
                                        />
                                    </h2>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    className={cx("blog-sub-title")}
                                >
                                    <p>
                                        Chúng tôi chia sẻ những tips làm đẹp
                                        hiệu quả.
                                    </p>
                                </Grid>
                                {tipsList.map((tips, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                    >
                                        <BlogItem
                                            imageSrc={tips?.image}
                                            title={tips?.label}
                                            description={tips?.desciption}
                                        />
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <a
                                            href="#"
                                            className={cx("see-more-btn")}
                                        >
                                            <span>Xem thêm</span>
                                            <ArrowForwardRounded />
                                        </a>
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

export default HomeBlog;
