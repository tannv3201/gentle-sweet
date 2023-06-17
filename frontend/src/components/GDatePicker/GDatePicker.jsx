import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { RedditTextField } from "../GTextField/GTextField";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import utc from "dayjs/plugin/utc";
import GTextFieldNormal from "../GTextField/GTextFieldNormal";

export const GFormatDate = (date, format) => {
    dayjs.extend(utc);
    return dayjs.utc(date).utcOffset("+07:00").format(format);
};

export default function GDatePicker({
    label,
    fullWidth,
    error,
    helperText,
    onBlur,
    formik,
    name,
    size,
    inputLabelProps,
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
                        size: size ? size : "small",
                        error: error,
                        helperText: helperText,
                        onBlur: onBlur,
                        color: "secondary",
                        InputLabelProps: inputLabelProps,
                    },
                }}
            />
        </LocalizationProvider>
    );
}

export function GDatePickerMobile({ label, size, ...props }) {
    return <GTextFieldNormal {...props} label={label} size={size} />;
}

export function DateFieldMobile({
    fullWidth,
    size,
    error,
    onBlur,
    helperText,
    inputLabelProps,
    label,
    ...props
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={["DateField", "DateField"]}> */}
            <DateField
                {...props}
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        fullWidth: fullWidth,
                        size: size ? size : "small",
                        error: error,
                        helperText: helperText,
                        onBlur: onBlur,
                        color: "secondary",
                        InputLabelProps: inputLabelProps,
                    },
                }}
                label={label}
            />
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
}
