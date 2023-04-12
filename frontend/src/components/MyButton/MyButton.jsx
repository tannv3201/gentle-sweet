import React from "react";
import { Button } from "@mui/material";

function MyButton({ children, ...props }) {
    return (
        <>
            <Button
                style={{ fontSize: "1.6rem", textTransform: "unset" }}
                {...props}
            >
                {children}
            </Button>
        </>
    );
}

export default MyButton;
