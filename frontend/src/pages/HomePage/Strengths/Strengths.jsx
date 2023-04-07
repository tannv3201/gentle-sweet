import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Strengths.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import { FavoriteRounded } from "@material-ui/icons";
import ModalImageGallery from "../../../components/ModalImageGallery/ModalImageGallery";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const cx = classNames.bind(styles);
const imgList = [
    {
        src: images.photo_realistic,
        alt: "Image 1",
        title: "Không gian làm việc",
    },
    {
        src: images.collection_1,
        alt: "Image 1",
        title: "Máy móc & công cụ",
    },
    {
        src: images.collection_2,
        alt: "Image 1",
        title: "Đội ngũ nhân viên",
    },
    {
        src: images.collection_3,
        alt: "Image 1",
        title: "Đa dạng dịch vụ",
    },
];
function Strengths() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [currentImage, setCurrentImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (index) => {
        setCurrentImage(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % imgList.length);
    };

    const prevImage = () => {
        if ((currentImage - 1) % imgList.length < 0) {
            setCurrentImage(imgList.length - 1);
        } else {
            setCurrentImage((currentImage - 1) % imgList.length);
        }
    };

    return (
        <div className={cx("advantage-wrapper")}>
            <div className={cx("advantage-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={cx("title")}>
                        <b></b>
                        <h2>
                            <FavoriteRounded />
                            <span>
                                Gentle luôn là điểm đến làm đẹp lý tưởng
                            </span>
                        </h2>
                        <b></b>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={cx("advantage")}
                    style={{ padding: "12px 0" }}
                >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ul>
                            <li>Là sự lựa chọn của 1000 khách hàng mỗi ngày</li>
                            <li>Kỹ thuật viên nhiều năm kinh nghiệm</li>
                            <li>Luôn cam kết hiệu quả mọi dịch vụ</li>
                        </ul>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ul>
                            <li>Cơ sở vật chất hiện đại</li>
                            <li>Luôn dẫn đầu về các công nghệ làm đẹp</li>
                            <li>
                                Luôn tư vấn và chuyên gia đưa ra liệu trình phù
                                hợp
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={cx("photo-realistic")}>
                    {imgList.map((image, index) => (
                        <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                            <div
                                className={cx("photo-realistic-img")}
                                style={isSmall ? { height: "240px" } : {}}
                                onClick={() => openModal(index)}
                            >
                                <img src={image.src} alt={image.alt} />
                                <span>{image.title}</span>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <ModalImageGallery
                    images={imgList}
                    openModal={openModal}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    currentImage={currentImage}
                    prevImage={prevImage}
                    nextImage={nextImage}
                />
            </div>
        </div>
    );
}

export default Strengths;
