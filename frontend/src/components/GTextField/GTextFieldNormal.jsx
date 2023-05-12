import React from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const RequiredLabel = () => {
    return <span style={{ color: "red" }}>*</span>;
};

function GTextFieldNormal({
    label,
    name,
    fullWidth = false,
    variant = "outlined",
    size = "small",
    type,
    requiredlabel = false,
    disabled,
    sx,
    willShrink = true,
    multiline,
    style,
    password,
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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {password ? (
                <TextField
                    {...configTextfield}
                    multiline={multiline}
                    label={displayLabel}
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ) : (
                <TextField
                    {...configTextfield}
                    multiline={multiline}
                    label={displayLabel}
                    color="secondary"
                />
            )}
        </>
    );
}

export default GTextFieldNormal;
