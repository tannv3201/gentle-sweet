import React from "react";
import { IconButton } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LightTooltip } from "../GTooltip/GTooltip";
import { SwipeableDrawer } from "@mui/material";

function GDrawer({
    children,
    handleToggleDrawer,
    onOpen,
    onClose,
    open,
    anchor,
    button,
}) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    // const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

    // const toggleDrawer = React.useCallback(
    //     () => setIsOpenDrawer((prevOpen) => !prevOpen),
    //     [setIsOpenDrawer]
    // );

    return (
        <Box
            sx={{
                position: "fixed",
                right: "16px",
                bottom: "80px",
                zIndex: 10,
            }}
        >
            {button && (
                <LightTooltip placement="left" title="Danh mục">
                    <IconButton
                        size="medium"
                        style={{
                            border: "1px solid var(--primary-500)",
                            backgroundColor: "var(--white)",
                        }}
                        onClick={handleToggleDrawer}
                    >
                        <MenuRounded />
                    </IconButton>
                </LightTooltip>
            )}
            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onClose={onClose}
                onOpen={onOpen}
                // className={cx("articles-drawer")}
            >
                {children}
            </SwipeableDrawer>
        </Box>
    );
}

export default GDrawer;
