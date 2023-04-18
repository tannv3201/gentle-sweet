import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    maxHeight: 600,
    bgcolor: "background.paper",
    border: "1px solid var(--border-color)",
    overflowY: "auto",
    boxShadow: 24,
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
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            <Modal keepMounted open={isOpen} onClose={handleClose}>
                <Box sx={{ ...style, maxHeight: isSmall ? 440 : 600 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "var(--light-gray)",
                            padding: "12px",
                            borderBottom: "1px solid var(--border-color)",
                            borderRadius: "6px",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "2rem",
                                fontWeight: "var(--fw-bold)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            {title}
                        </h2>
                        <IconButton
                            onClick={handleClose}
                            size={isSmall ? "large" : "medium"}
                        >
                            <CloseRounded />
                        </IconButton>
                    </div>
                    <div style={{ padding: "8px 8px 12px 8px" }}>
                        {" "}
                        {children}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
