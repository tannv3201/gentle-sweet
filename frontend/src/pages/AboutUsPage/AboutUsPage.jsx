import React from "react";
import classNames from "classnames/bind";
import styles from "./AboutUsPage.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import images from "../../assets/images";
import AboutUsPosts from "./AboutUsPosts/AboutUsPosts";
import Overview from "./Overview/Overview";
import VisionMission from "./VisionMission/VisionMission";
import CoreValues from "./CoreValues/CoreValues";
import Services from "./Services/Services";

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
        fontWeight: "var(--fw-medium)",
        fontSize: "1.6rem !important",
    },
}));

function BreadCrumb({ ...props }) {
    const classes = useStyles();

    return (
        <Breadcrumbs {...props} aria-label="breadcrumb">
            <NavLink to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Trang chủ
            </NavLink>

            <Typography color="textPrimary" className={classes.active}>
                Về chúng tôi
            </Typography>
        </Breadcrumbs>
    );
}

function AboutUsPage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("breadcrumb-wrapper")}>
                <div className={cx("breadcrumb")}>
                    <BreadCrumb />
                </div>
            </div>
            <div className={cx("banner-img")}>
                <img src={images.banner_about_us} alt="" />
            </div>
            <Overview />
            <VisionMission />
            <CoreValues />
            <Services />
            <AboutUsPosts />
        </div>
    );
}

export default AboutUsPage;
