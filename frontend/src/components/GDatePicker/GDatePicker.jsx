import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { RedditTextField } from "../GTextField/GTextField";

export default function GDatePicker({
    label,
    fullWidth,
    error,
    helperText,
    onBlur,
    formik,
    name,
    ...props
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                label={label}
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        fullWidth: fullWidth,
                        size: "small",
                        error: error,
                        helperText: helperText,
                        onBlur: onBlur,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
