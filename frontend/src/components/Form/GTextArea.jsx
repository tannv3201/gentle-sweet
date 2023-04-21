import React from "react";
import styles from "./GTextArea.module.scss";
import classNames from "classnames/bind";
import { RequiredLabel } from "../GTextField/GTextField";
import { CheckBoxOutlineBlankRounded } from "@mui/icons-material";

const cx = classNames.bind(styles);

function GTextArea({
    children,
    name,
    id,
    cols,
    rows,
    label,
    placeholder,
    requiredlabel = false,
    ...props
}) {
    const displayLabel = label ? (
        <label className={cx("label-textarea")} htmlFor={id}>
            {label} {requiredlabel && <RequiredLabel />}
        </label>
    ) : (
        ""
    );
    return (
        <>
            {displayLabel}
            <textarea
                placeholder={placeholder}
                name={name}
                id={id}
                cols={cols}
                rows={rows}
                {...props}
                className={cx("mytext-area")}
            >
                {children}
            </textarea>
        </>
    );
}

export default GTextArea;
