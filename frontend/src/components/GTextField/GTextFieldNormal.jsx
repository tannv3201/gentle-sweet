import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormikContext } from "formik";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
    isShowPassword,
    formik,
    onBlur,
    ...otherProps
}) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

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
    useEffect(() => {
        if (isShowPassword) setShowPassword(isShowPassword);
    }, [isShowPassword]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {password ? (
                <TextField
                    {...configTextfield}
                    onBlur={formik?.handleBlur}
                    error={
                        formik?.touched[name] && Boolean(formik?.errors[name])
                    }
                    helperText={formik?.touched[name] && formik?.errors[name]}
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
                                    size={isMedium ? "large" : "medium"}
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
                    onBlur={onBlur ? onBlur : formik?.handleBlur}
                    multiline={multiline}
                    label={displayLabel}
                    color="secondary"
                    error={
                        formik?.touched[name] && Boolean(formik?.errors[name])
                    }
                    helperText={formik?.touched[name] && formik?.errors[name]}
                />
            )}
        </>
    );
}

export default React.memo(GTextFieldNormal);
