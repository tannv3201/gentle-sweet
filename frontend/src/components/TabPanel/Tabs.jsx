import Tabs from "@material-ui/core/Tabs";

import { withStyles } from "@material-ui/core/styles";
const TabsInWhite = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: "transparent",
        },
    },
})(Tabs);

function MyTabs({ children, ...props }) {
    return <TabsInWhite {...props}>{children}</TabsInWhite>;
}

export default MyTabs;
