import React from "react";
import styles from "./GImage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function GImage({ imgSrc, alt, caption }) {
    return (
        <figure>
            <div className={cx("image-wrapper")}>
                <img src={imgSrc} alt={alt} />
            </div>
            <figcaption>{caption}</figcaption>
        </figure>
    );
}

export default GImage;
