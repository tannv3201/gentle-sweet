import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import GTextFieldNormal from "../GTextField/GTextFieldNormal";

export default function GentleAutocomplete({
    fullWidth,
    variant,
    label,
    id,
    data,
    onChange,
    value,
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
                <GTextFieldNormal
                    {...params}
                    onChange={onChange}
                    value={value}
                    fullWidth={fullWidth}
                    variant={variant}
                    label={label}
                />
            )}
            isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option.id === value.id
            }
        />
    );
}
