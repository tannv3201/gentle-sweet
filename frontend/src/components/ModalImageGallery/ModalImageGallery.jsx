import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalImageGallery.module.scss";
import { Grid, IconButton } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
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
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
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
                            <CloseRounded
                                fontSize={isSmall ? "large" : "medium"}
                            />
                        </IconButton>
                        <IconButton
                            onClick={prevImage}
                            className={cx("btn-prev")}
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
