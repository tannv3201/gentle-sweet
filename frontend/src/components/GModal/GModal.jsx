import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames/bind";
import styles from "./GModal.module.scss";

const cx = classNames.bind(styles);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
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
                <Box sx={{ ...style }}>
                    <div className={cx("modal-wrapper")}>
                        <div className={cx("modal-header")}>
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
                        <div className={cx("modal-body")}> {children}</div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
