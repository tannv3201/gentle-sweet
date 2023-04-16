import React from "react";
import "./GTextArea.module.scss";
import { RequiredLabel } from "../GTextField/GTextField";
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
        <label htmlFor={id}>
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
            >
                {children}
            </textarea>
        </>
    );
}

export default GTextArea;
