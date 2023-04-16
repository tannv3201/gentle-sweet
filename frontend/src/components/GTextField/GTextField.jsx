import React from "react";
import TextField from "@mui/material/TextField";

export const RequiredLabel = () => {
    return <span style={{ color: "red" }}>*</span>;
};

function GTextField({
    label,
    name,
    fullWidth = false,
    variant = "outlined",
    size = "small",
    type = "text",
    requiredlabel = false,
    disabled,
    sx,
    willShrink,
    ...otherProps
}) {
    const configTextfield = {
        name: name,
        fullWidth: fullWidth,
        variant: variant,
        size: size,
        type: type,
        label: label,
        disabled: disabled,
        InputLabelProps: {
            htmlFor: name,
            shrink: true,
        },
        sx: {
            ...sx,
            backgroundColor: disabled && "#f8f8f8",
        },
        ...otherProps,
    };

    const displayLabel = label ? (
        <>
            {label} {requiredlabel && <RequiredLabel />}
        </>
    ) : (
        ""
    );

    return (
        <>
            <TextField {...configTextfield} label={displayLabel} />
        </>
    );
}

export default GTextField;
