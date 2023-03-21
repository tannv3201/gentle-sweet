import React from "react";
import { Button } from "@material-ui/core";

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
