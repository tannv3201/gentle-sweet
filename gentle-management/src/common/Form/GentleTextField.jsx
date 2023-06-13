import React from "react";
import TextField from "@mui/material/TextField";
import { FastField } from "formik";

export const RequiredLabel = () => {
    return <span style={{ color: "red" }}>*</span>;
};

const GentleTextField = (props) => {
    return (
        <FastField {...props} name={props.name}>
            {({ field, meta }) => {
                return <MyTextField {...props} field={field} meta={meta} />;
            }}
        </FastField>
    );
};

function MyTextField({
    label,
    name,
    fullWidth = false,
    variant = "outlined",
    size = "small",
    type = "text",
    requiredlabel = false,
    disabled,
    sx,
    field,
    meta,
    willShrink,
    multiline,
    style,
    error,
    helperText,
    ...otherProps
}) {
    const configTextfield = {
        ...field,
        name: name,
        fullWidth: fullWidth,
        variant: variant,
        size: size,
        type: type,
        label: label,
        disabled: disabled,
        InputLabelProps: {
            shrink: willShrink,
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

    const isError = meta && meta.touched && meta.error;
    configTextfield.error = isError;
    configTextfield.helperText = meta.error;

    return (
        <>
            <TextField
                {...configTextfield}
                multiline={multiline}
                label={displayLabel}
                color="secondary"
                error={error}
                helperText={helperText}
            />
        </>
    );
}

export default React.memo(GentleTextField);
