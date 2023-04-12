import Tabs from "@mui/material/Tabs";

import withStyles from "@mui/styles/withStyles";
const TabsInWhite = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent !important",
        "& > span": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: "transparent !important",
        },
    },
})(Tabs);

function MyTabs({ children, variant, scrollButtons, ...props }) {
    return (
        <TabsInWhite variant={variant} scrollButtons={scrollButtons} {...props}>
            {children}
        </TabsInWhite>
    );
}

export default MyTabs;
