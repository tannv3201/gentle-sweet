import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PhotoRealistic.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import AppBar from "@mui/material/AppBar";

import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs from "../../../components/TabPanel/Tabs";
import MyTab from "../../../components/TabPanel/Tab";
import MySlider from "../../../components/MySlider/MySlider";
import ModalImageGallery from "../../../components/ModalImageGallery/ModalImageGallery";
const cx = classNames.bind(styles);

const photoList = [
    {
        title: "Vệ sinh móng",
        images: [
            { src: images.clean_tools_1 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
    {
        title: "Vẽ móng",
        images: [
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
    {
        title: "Phục hồi tóc",
        images: [
            { src: images.clean_tools_2 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
    {
        title: "Uốn/nhuộm",
        images: [
            { src: images.clean_tools_1 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
    {
        title: "Tạo kiểu tóc",
        images: [
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
    {
        title: "Cắt tóc",
        images: [
            { src: images.clean_tools_1 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_1 },
            { src: images.clean_tools_3 },
            { src: images.clean_tools_2 },
            { src: images.clean_tools_1 },
        ],
    },
];

function PhotoRealistic() {
    const [value, setValue] = React.useState(0);
    let dragging = false;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
        setCurrentImage((currentImage + 1) % photoList.length);
    };

    const prevImage = () => {
        if ((currentImage - 1) % photoList.length < 0) {
            setCurrentImage(photoList.length - 1);
        } else {
            setCurrentImage((currentImage - 1) % photoList.length);
        }
    };

    return (
        <div className={cx("photo-realistic-wrapper")}>
            <div className={cx("photo-realistic-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={cx("photo-realistic-title")}>
                        <b></b>
                        <h2>Hình ảnh thực tế</h2>
                        <b></b>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        className={cx("photo-realistic-sub-title")}
                    >
                        <p>
                            Cảm nhận sự khác biệt khi đến với hệ thống làm đẹp
                            hàng đầu GentleBeauty.
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div>
                            <AppBar position="static" color="default">
                                <MyTabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    {photoList.map((photo, index) => (
                                        <MyTab
                                            bgWhite
                                            key={index}
                                            label={photo.title}
                                        />
                                    ))}
                                </MyTabs>
                            </AppBar>
                            <div className={cx("tab-panel-container")}>
                                {photoList.map((photo, index) => (
                                    <TabPanel
                                        key={index}
                                        value={value}
                                        index={index}
                                        style={{ zIndex: 1 }}
                                    >
                                        <MySlider
                                            autoplay
                                            infinite
                                            autoplaySpeed={3000}
                                            pauseOnHover
                                            slidesToShow={3}
                                            slidesToScroll={1}
                                            // dragging={dragging}
                                            beforeChange={() =>
                                                (dragging = false)
                                            }
                                            afterChange={() =>
                                                (dragging = true)
                                            }
                                        >
                                            {photo.images.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className={cx(
                                                            "slider-item-wrapper"
                                                        )}
                                                        // onClick={() =>
                                                        //     openModal(index)
                                                        // }
                                                        onClick={() => {
                                                            dragging &&
                                                                openModal(
                                                                    index
                                                                );
                                                        }}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "slider-item"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "slider-img"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        image.src
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </MySlider>
                                        <ModalImageGallery
                                            images={photoList[value].images}
                                            openModal={openModal}
                                            isModalOpen={isModalOpen}
                                            closeModal={closeModal}
                                            currentImage={currentImage}
                                            prevImage={prevImage}
                                            nextImage={nextImage}
                                        />
                                    </TabPanel>
                                ))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default PhotoRealistic;
