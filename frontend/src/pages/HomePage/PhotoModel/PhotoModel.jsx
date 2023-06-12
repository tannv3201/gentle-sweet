import React from "react";
import classNames from "classnames/bind";
import styles from "./PhotoModel.module.scss";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function PhotoModel() {
    return (
        <div className={cx("photo-model-wrapper")}>
            <div className={cx("photo-model-inner")}>
                <div className={cx("photo-model-img")}>
                    <img src={images.photo_model_1} alt="" />
                </div>
            </div>
        </div>
    );
}

export default PhotoModel;
