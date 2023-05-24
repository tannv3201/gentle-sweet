// import React from "react";
// import TextField from "@mui/material/TextField";
// import { alpha, styled } from "@mui/material/styles";
// import { IconButton } from "@mui/material";

// export const RequiredLabel = () => {
//     return <span style={{ color: "red" }}>*</span>;
// };

// export const RedditTextField = styled(
//     ({
//         label,
//         groupLabel,
//         requiredlabel,
//         name,
//         multiline,
//         rows,
//         disabled,
//         iconButtonStart,
//         iconButtonEnd,
//         iconButtonSize = "small",
//         variant = "filled",
//         ...props
//     }) => (
//         <>
//             {groupLabel && (
//                 <div
//                     style={{
//                         marginBottom: "4px",
//                     }}
//                 >
//                     <label
//                         htmlFor={name}
//                         style={{
//                             fontSize: "1.8rem",
//                             fontWeight: "var(--fw-medium)",
//                         }}
//                     >
//                         {groupLabel}
//                     </label>
//                 </div>
//             )}
//             <TextField
//                 // InputProps={{ disableUnderline: true,  }}
//                 InputProps={
//                     iconButtonStart
//                         ? {
//                               startAdornment: (
//                                   <IconButton size={iconButtonSize}>
//                                       {iconButtonStart}
//                                   </IconButton>
//                               ),
//                           }
//                         : iconButtonEnd
//                         ? {
//                               endAdornment: (
//                                   <IconButton size={iconButtonSize}>
//                                       {iconButtonEnd}
//                                   </IconButton>
//                               ),
//                           }
//                         : null
//                 }
//                 id={name}
//                 variant={variant}
//                 multiline={multiline}
//                 rows={rows}
//                 disabled={disabled}
//                 label={
//                     label ? (
//                         <>
//                             {label} {requiredlabel && <RequiredLabel />}
//                         </>
//                     ) : (
//                         ""
//                     )
//                 }
//                 {...props}
//             />
//         </>
//     )
// )(({ theme }) => ({
//     "& .MuiFilledInput-root": {
//         border: "1px solid #e2e2e1",
//         overflow: "hidden",
//         borderRadius: 4,
//         backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//         transition: theme.transitions.create([
//             "border-color",
//             "background-color",
//             "box-shadow",
//         ]),
//         "&:hover": {
//             backgroundColor: "transparent",
//         },
//         "&.Mui-focused": {
//             backgroundColor: "transparent",
//             boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//             borderColor: theme.palette.primary.main,
//         },
//     },
// }));

import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const RequiredLabel = () => {
    return <span style={{ color: "red" }}>*</span>;
};

const GTextField = ({
    label,
    groupLabel,
    requiredlabel = false,
    name,
    multiline,
    rows,
    disabled,
    iconButtonStart,
    iconButtonEnd,
    iconButtonSize = "small",
    variant = "filled",
    ...props
}) => {
    const InputProps = iconButtonStart
        ? {
              startAdornment: (
                  <IconButton size={iconButtonSize}>
                      {iconButtonStart}
                  </IconButton>
              ),
          }
        : iconButtonEnd
        ? {
              endAdornment: (
                  <IconButton size={iconButtonSize}>{iconButtonEnd}</IconButton>
              ),
          }
        : null;

    return (
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
                InputProps={InputProps}
                id={name}
                variant={variant}
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                label={
                    label ? (
                        <>
                            {label}{" "}
                            {requiredlabel === true && <RequiredLabel />}
                        </>
                    ) : (
                        ""
                    )
                }
                {...props}
            />
        </>
    );
};

export default styled(GTextField)(({ theme }) => ({
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
