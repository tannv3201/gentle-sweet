import React from "react";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";

import {
    ReceiptRounded,
    LocationOnRounded,
    FavoriteRounded,
    PersonRounded,
    ShoppingCartRounded,
} from "@material-ui/icons";
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from "@material-ui/core/styles";

const CustomTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "var(--grey)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--grey)",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#ccc",
            },
            "&:hover fieldset": {
                borderColor: "var(--black)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ccc",
            },
        },
        "& label": {
            fontSize: "1.6rem",
        },
        "& legend": {
            fontSize: "1.2rem",
        },
        "& .MuiInputBase-input": {
            fontSize: "1.6rem",
            fontFamily: "var(--font-family)",
        },
    },
})(TextField);

const TextFieldLight = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "var(--grey)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--grey)",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#ccc",
            },
            "&:hover fieldset": {
                borderColor: "var(--black)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ccc",
            },
        },
        "& label": {
            fontSize: "1.6rem",
        },
        "& legend": {
            fontSize: "1.2rem",
        },
        "& .MuiInputBase-input": {
            fontSize: "1.6rem",
            fontFamily: "var(--font-family)",
            color: "var(--white)",
        },
    },
})(TextField);

function MyTextField({
    label,
    variant = "outlined",
    size = "small",
    iconButtonStart,
    iconButtonEnd,
    buttonSize = "small",
    fontSizeIcon = "inherit",
    placeholder,
    bgLight,
    bgDark,
    ...props
}) {
    return bgLight ? (
        <CustomTextField
            label={label}
            size={size}
            variant={variant}
            placeholder={placeholder}
            // id="standard-start-adornment"
            InputProps={
                iconButtonStart
                    ? {
                          startAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonStart}
                              </IconButton>
                          ),
                      }
                    : iconButtonEnd
                    ? {
                          endAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonEnd}
                              </IconButton>
                          ),
                      }
                    : null
            }
        />
    ) : bgDark ? (
        <TextFieldLight
            label={label}
            size={size}
            variant={variant}
            placeholder={placeholder}
            // id="standard-start-adornment"
            InputProps={
                iconButtonStart
                    ? {
                          startAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonStart}
                              </IconButton>
                          ),
                      }
                    : iconButtonEnd
                    ? {
                          endAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonEnd}
                              </IconButton>
                          ),
                      }
                    : null
            }
        />
    ) : (
        <CustomTextField
            label={label}
            size={size}
            variant={variant}
            placeholder={placeholder}
            // id="standard-start-adornment"
            InputProps={
                iconButtonStart
                    ? {
                          startAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonStart}
                              </IconButton>
                          ),
                      }
                    : iconButtonEnd
                    ? {
                          endAdornment: (
                              <IconButton size={buttonSize}>
                                  {iconButtonEnd}
                              </IconButton>
                          ),
                      }
                    : null
            }
        />
    );
}

export default MyTextField;
