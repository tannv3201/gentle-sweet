import React from "react";
import IconButton from "@mui/material/IconButton";

function MyIconButton({ children, size, ...props }) {
    return <>
        <IconButton {...props} size="large">{children}</IconButton>
    </>;
}

export default MyIconButton;
