import React from "react";
import styles from "./ProductRating.module.scss";
import classNames from "classnames/bind";
import Comments from "../../../../components/Comments/Comments";

const cx = classNames.bind(styles);

function ProductRating() {
    return (
        <>
            <Comments />
        </>
    );
}

export default ProductRating;
