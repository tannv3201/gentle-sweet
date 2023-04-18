import React from "react";
import { Button } from "@mui/material";

function GButton({
    children,
    startIcon,
    size = "small",
    endIcon,
    variant = "contained",
    className,
    style,
    ...props
}) {
    return (
        <>
            <Button
                {...props}
                startIcon={startIcon}
                endIcon={endIcon}
                size={size}
                variant={variant}
                className={className}
                style={style}
            >
                {children}
            </Button>
        </>
    );
}

export default GButton;
