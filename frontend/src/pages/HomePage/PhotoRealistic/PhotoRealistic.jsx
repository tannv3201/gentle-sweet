import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PhotoRealistic.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import AppBar from "@material-ui/core/AppBar";

import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs, { StyledTabs } from "../../../components/TabPanel/Tabs";
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
    console.log(value);

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

    const [isMouseDown, setIsMouseDown] = useState(false);

    const [dragStartX, setDragStartX] = useState(0);
    const [dragX, setDragX] = useState(0);

    const handleMouseDown = (event) => {
        event.stopPropagation();
        setIsMouseDown(true);
        setDragStartX(event.clientX); // Lưu giá trị clientX của sự kiện onMouseDown
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (event) => {
        if (isMouseDown) {
            // Tính toán vị trí mới của slide
            const dragDelta = event.clientX - dragStartX;
            setDragX(dragX + dragDelta);
        }
    };

    const handleClick = (index) => {
        if (!isMouseDown) {
            // Code để xử lý sự kiện onClick
            openModal(index);
        }
    };

    return (
        <div className={cx("photo-realistic-wrapper")}>
            <div className={cx("photo-realistic-inner")}>
                <Grid container>
                    <Grid item xs={12} className={cx("photo-realistic-title")}>
                        <b></b>
                        <h2>Hình ảnh thực tế</h2>
                        <b></b>
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
                                        <div style={{ zIndex: 0 }}>
                                            <MySlider
                                                autoplay
                                                infinite
                                                autoplaySpeed={3000}
                                                pauseOnHover
                                                slidesToShow={3}
                                                slidesToScroll={1}
                                            >
                                                {photo.images.map(
                                                    (image, index) => (
                                                        <div
                                                            key={index}
                                                            className={cx(
                                                                "slider-item-wrapper"
                                                            )}
                                                            onClick={() =>
                                                                openModal(index)
                                                            }
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
                                        </div>
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