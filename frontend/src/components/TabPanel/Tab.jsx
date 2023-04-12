import withStyles from "@mui/styles/withStyles";
import Tab from "@mui/material/Tab";

const TabInWhite = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "var(--primary)",
        border: "1px solid",
        borderRadius: "50px",
        backgroundColor: "transparent",
        fontSize: "1.6rem",
        fontFamily: "var(--font-family)",
        marginRight: "8px",
        "&:focus": {
            // opacity: 1,
        },

        ".MuiTab-textColorPrimary.Mui-selected": {
            color: "#fff",
            background: "var(--primary)",
            borderRadius: "50px",
        },
        ".MuiPaper-elevation": {
            boxShadow: 0,
        },
    },
}))(Tab);

const TabInPrimary = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "var(--primary) !important",
        border: "1px solid",
        borderRadius: "50px",
        backgroundColor: "transparent",
        fontSize: "1.6rem",
        fontFamily: "var(--font-family)",
        marginRight: "8px",
        "&:focus": {
            // opacity: 1,
        },

        "& button.Mui-selected": {
            color: "var(--primary) !important",
            background: "var(--primary) !important",
        },
        ".MuiPaper-elevation": {
            boxShadow: 0,
        },
    },
}))(Tab);

function MyTab({ bgWhite, bgPrimary, key, ...props }) {
    return (
        <>
            {bgWhite ? (
                <TabInWhite key={key} {...props} />
            ) : bgPrimary ? (
                <TabInPrimary {...props} />
            ) : null}
        </>
    );
}

export default MyTab;
