import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const TabInWhite = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "var(--primary)",
        border: "1px solid",
        borderRadius: "50px",
        backgroundColor: "transparent",
        fontSize: "1.6rem",
        fontFamily: "var(--font-family)",
        marginRight: theme.spacing(1),
        "&:focus": {
            // opacity: 1,
        },

        ".MuiTab-textColorPrimary.Mui-selected": {
            color: "#fff",
            background: "var(--primary)",
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
        marginRight: theme.spacing(1),
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
