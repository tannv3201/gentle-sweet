import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Strengths.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import { FavoriteRounded, CheckRounded } from "@mui/icons-material";
import ModalImageGallery from "../../../components/ModalImageGallery/ModalImageGallery";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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

const subTitleList = [
    {
        children: [
            "Là sự lựa chọn của 1000 khách hàng mỗi ngày",
            "Kỹ thuật viên nhiều năm kinh nghiệm",
            "Luôn cam kết hiệu quả mọi dịch vụ",
        ],
    },
    {
        children: [
            "Cơ sở vật chất hiện đại",
            "Luôn dẫn đầu về các công nghệ làm đẹp",
            "Luôn tư vấn và chuyên gia đưa ra liệu trình phù hợp",
        ],
    },
];
function Strengths() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('lg'));
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

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
                    className={cx("sub-title")}
                    style={{ padding: "12px 0" }}
                >
                    {subTitleList?.map((subTitle, index) => (
                        <Grid key={index} item lg={6} md={6} sm={12} xs={12}>
                            <ul style={{ listStyle: "none" }}>
                                {subTitle?.children?.map((child, index) => (
                                    <li key={index} style={{ display: "flex" }}>
                                        <CheckRounded
                                            style={{
                                                paddingTop: "4px",
                                                marginRight: "4px",
                                            }}
                                        />
                                        <span>{child}</span>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
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
