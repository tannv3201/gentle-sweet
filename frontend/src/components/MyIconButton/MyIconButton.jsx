import React from "react";
import IconButton from "@material-ui/core/IconButton";

function MyIconButton({ children, size, ...props }) {
    return (
        <>
            <IconButton {...props}>{children}</IconButton>
        </>
    );
}

export default MyIconButton;
