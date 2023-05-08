import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import GentleTextField from "./GentleTextField";

export default function GentleAutocomplete({
    fullWidth,
    variant,
    label,
    id,
    data,
    ...props
}) {
    return (
        <Autocomplete
            disablePortal
            {...props}
            id={id}
            options={data}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
                <GentleTextField
                    {...params}
                    fullWidth={fullWidth}
                    variant={variant}
                    label={label}
                />
            )}
        />
    );
}
