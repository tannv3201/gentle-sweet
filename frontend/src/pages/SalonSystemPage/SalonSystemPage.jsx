import React from "react";
import classNames from "classnames/bind";
import styles from "./SalonSystemPage.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
const cx = classNames.bind(styles);
const useStyles = makeStyles((theme) => ({
    link: {
        display: "flex",
        color: "var(--dark)",
        fontSize: "1.6rem",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
    active: {
        color: "var(--primary)",
        fontWeight: "600",
        fontSize: "1.6rem !important",
    },
}));

function BreadCrumb() {
    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Trang chủ
            </Link>

            <Typography color="textPrimary" className={classes.active}>
                Hệ thống chi nhánh
            </Typography>
        </Breadcrumbs>
    );
}

function SalonSystemPage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("breadcrumb-wrapper")}>
                <BreadCrumb />
            </div>
            <div className={cx("inner")}>
                <h1>SalonSystemPage </h1>
            </div>
        </div>
    );
}

export default SalonSystemPage;
