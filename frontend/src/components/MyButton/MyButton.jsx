import React from "react";
import { Button } from "@mui/material";

function GButton({
    children,
    startIcon,
    size = "small",
    variant = "contained",
    ...props
}) {
    return (
        <>
            <Button
                {...props}
                startIcon={startIcon}
                size={size}
                variant={variant}
            >
                {children}
            </Button>
        </>
    );
}

export default GButton;
