import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import GTextField from "../GTextField/GTextField";

export default function GAutocomplete({
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
                <GTextField
                    {...params}
                    fullWidth={fullWidth}
                    variant={variant}
                    label={label}
                />
            )}
        />
    );
}
