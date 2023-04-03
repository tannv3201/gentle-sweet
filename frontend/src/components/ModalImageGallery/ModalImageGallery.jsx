import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalImageGallery.module.scss";
import { Grid, IconButton } from "@material-ui/core";
import {
    CloseRounded,
    ArrowForwardIosRounded,
    ArrowBackIosRounded,
} from "@material-ui/icons";

const cx = classNames.bind(styles);

function ModalImageGallery({
    images,
    openModal,
    isModalOpen,
    closeModal,
    currentImage,
    prevImage,
    nextImage,
}) {
    // const [currentImage, setCurrentImage] = useState(0);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = (index) => {
    //     setCurrentImage(index);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    // const nextImage = () => {
    //     setCurrentImage((currentImage + 1) % images.length);
    // };

    // const prevImage = () => {
    //     if ((currentImage - 1) % images.length < 1) {
    //         setCurrentImage(images.length - 1);
    //     } else {
    //         setCurrentImage((currentImage - 1) % images.length);
    //     }
    // };

    return (
        <>
            {isModalOpen && (
                <div className={cx("modal")}>
                    <div className={cx("modal-overlay")} onClick={closeModal} />
                    <div className={cx("modal-content")}>
                        <IconButton
                            className={cx("btn-close")}
                            onClick={closeModal}
                        >
                            <CloseRounded />
                        </IconButton>
                        <IconButton
                            onClick={prevImage}
                            className={cx("btn-prev")}
                        >
                            <ArrowBackIosRounded />
                        </IconButton>
                        <div className={cx("modal-image-container")}>
                            <img
                                src={images[currentImage]?.src}
                                alt={images[currentImage]?.alt}
                            />
                            {images[currentImage]?.title && (
                                <span>{images[currentImage]?.title}</span>
                            )}
                        </div>

                        <IconButton
                            onClick={nextImage}
                            className={cx("btn-next")}
                        >
                            <ArrowForwardIosRounded />
                        </IconButton>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalImageGallery;
