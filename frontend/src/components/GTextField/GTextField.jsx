import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

export const RequiredLabel = () => {
    return <span style={{ color: "red" }}>*</span>;
};

export const RedditTextField = styled(
    ({
        label,
        groupLabel,
        requiredlabel,
        name,
        multiline,
        rows,
        disabled,
        variant = "filled",
        ...props
    }) => (
        <>
            {groupLabel && (
                <div
                    style={{
                        marginBottom: "4px",
                    }}
                >
                    <label
                        htmlFor={name}
                        style={{
                            fontSize: "1.8rem",
                            fontWeight: "var(--fw-medium)",
                        }}
                    >
                        {groupLabel}
                    </label>
                </div>
            )}
            <TextField
                InputProps={{ disableUnderline: true }}
                id={name}
                variant={variant}
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                label={
                    label ? (
                        <>
                            {label} {requiredlabel && <RequiredLabel />}
                        </>
                    ) : (
                        ""
                    )
                }
                {...props}
            />
        </>
    )
)(({ theme }) => ({
    "& .MuiFilledInput-root": {
        border: "1px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&.Mui-focused": {
            backgroundColor: "transparent",
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

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
    multiline,
    style,
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
            <TextField
                {...configTextfield}
                multiline={multiline}
                label={displayLabel}
            />
        </>
    );
}

export default GTextField;
