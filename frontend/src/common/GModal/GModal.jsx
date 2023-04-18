import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 1,
    borderRadius: "6px",
    fontFamily: "var(--font-family)",
};

export default function GModal({
    isOpen,
    handleClose,
    handleOpen,
    children,
    title,
}) {
    return (
        <div>
            <Modal keepMounted open={isOpen} onClose={handleClose}>
                <Box sx={style}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "2.4rem",
                                fontWeight: "var(--fw-bold)",
                            }}
                        >
                            {title}
                        </h2>
                        <IconButton onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
