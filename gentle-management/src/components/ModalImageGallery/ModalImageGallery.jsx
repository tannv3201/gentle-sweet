import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalImageGallery.module.scss";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    CloseRounded,
    ArrowForwardIosRounded,
    ArrowBackIosRounded,
} from "@mui/icons-material";

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
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            {isModalOpen && (
                <div className={cx("modal")}>
                    <div className={cx("modal-overlay")} onClick={closeModal} />
                    <div className={cx("modal-content")}>
                        <IconButton
                            className={cx("btn-close")}
                            onClick={closeModal}
                            size="large"
                        >
                            <CloseRounded
                                fontSize={isSmall ? "large" : "medium"}
                            />
                        </IconButton>
                        <IconButton
                            onClick={prevImage}
                            className={cx("btn-prev")}
                            size="large"
                        >
                            <ArrowBackIosRounded
                                fontSize={isSmall ? "large" : "medium"}
                            />
                        </IconButton>
                        <div
                            className={
                                isSmall
                                    ? cx("modal-image-container", "isSmall")
                                    : isExtraSmall
                                    ? cx(
                                          "modal-image-container",
                                          "isExtraSmall"
                                      )
                                    : cx("modal-image-container")
                            }
                        >
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
                            size="large"
                        >
                            <ArrowForwardIosRounded
                                fontSize={isSmall ? "large" : "medium"}
                            />
                        </IconButton>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalImageGallery;
