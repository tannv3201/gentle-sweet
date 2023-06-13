import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { LightTooltip } from "../../../components/GTooltip/GTooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        // bottom: theme.spacing(2),
        // right: theme.spacing(2),
        bottom: "16px",
        right: "16px",
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Zoom in={trigger}>
            <div
                onClick={handleClick}
                role="presentation"
                className={classes.root}
            >
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function ScrollBackToTop({ children, ...props }) {
    return (
        <>
            <div id="back-to-top-anchor" />
            {children}
            <ScrollTop {...props}>
                <LightTooltip
                    title="Về đầu trang"
                    placement="left"
                    style={{
                        fontSize: "1.6rem !important",
                        fontFamily: "var(--font-family) !important",
                    }}
                >
                    <Fab
                        color="secondary"
                        size="small"
                        aria-label="scroll back to top"
                        style={{ backgroundColor: "var(--primary-500)" }}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </LightTooltip>
            </ScrollTop>
        </>
    );
}
