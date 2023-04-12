import React from "react";
import { Checkbox } from "@mui/material";
import styles from "./MyCheckbox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MyCheckbox({ id, name, label, value, checked, onChange, ...props }) {
    return (
        <>
            <Checkbox
                id={id}
                style={{
                    color: "var(--primary)",
                }}
                // color="primary"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </>
    );
}

export default MyCheckbox;
