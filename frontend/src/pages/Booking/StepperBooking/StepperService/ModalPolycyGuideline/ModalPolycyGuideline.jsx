import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalPolycyGuideline.module.scss";
import { Grid } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GModal from "../../../../../common/GModal/GModal";

const cx = classNames.bind(styles);

function ModalPolycyGuideline({ handleClose, handleOpen, isOpen }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <GModal
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Chính sách và hướng dẫn"
            >
                <div></div>
            </GModal>
        </>
    );
}

export default ModalPolycyGuideline;
