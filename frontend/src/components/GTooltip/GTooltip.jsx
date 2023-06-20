import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export const LightTooltip = styled(
    ({ className, title, placement, arrow, ...props }) => (
        <Tooltip
            title={title}
            placement={placement}
            arrow={arrow}
            {...props}
            classes={{ popper: className }}
        />
    )
)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "var(--white)",
        color: "var(--text-primary)",
        boxShadow:
            "var(--primary-box-shadow) 0px 1px 3px, var(--primary-box-shadow) 0px 1px 2px",
        fontSize: "1.4rem",
        fontFamily: "var(--font-family)",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "var(--white)",
    },
}));

export const TooltipMobile = styled(
    ({ className, title, placement, arrow, ...props }) => (
        <Tooltip
            title={title}
            placement={placement}
            arrow={arrow}
            {...props}
            classes={{ popper: className }}
        />
    )
)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "var(--white)",
        color: "var(--text-primary)",
        boxShadow:
            "var(--primary-box-shadow) 0px 1px 3px, var(--primary-box-shadow) 0px 1px 2px",
        fontSize: "1.4rem",
        fontFamily: "var(--font-family)",
        maxWidth: 148,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "var(--white)",
    },
}));
