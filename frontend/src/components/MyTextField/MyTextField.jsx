import React from "react";
import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";

import withStyles from '@mui/styles/withStyles';

const RoundedBorderTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "var(--grey)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--grey)",
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            "& fieldset": {
                borderColor: "var(--primary-box-shadow)",
            },
            "&:hover fieldset": {
                borderColor: "var(--black)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "var(--primary-400)",
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
            boxShadow: "var(--primary-box-shadow) 0px 2px 8px",

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
    roundedBorder,
    ...props
}) {
    const nodeRef = React.useRef(null);

    return bgLight ? (
        <CustomTextField
            {...props}
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
            {...props}
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
    ) : roundedBorder ? (
        <RoundedBorderTextField
            {...props}
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
            {...props}
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
