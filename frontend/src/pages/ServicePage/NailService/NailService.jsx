import React from "react";
import classNames from "classnames/bind";
import styles from "./NailService.module.scss";
import images from "../../../assets/images";
import { Grid } from "@material-ui/core";

const cx = classNames.bind(styles);

const servicesList = [
    {
        title: "Dịch vụ Nails",
        services: [
            {
                title: "Massage tay chân",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Nhúng bột nail",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn French",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn Ombre",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Móng úp nghệ thuật",
                image: images.service_1,
                href: "#",
            },
        ],
        description:
            "Gentle cung cấp dịch vụ làm nails và chăm sóc da tay chân để bạn trải nghiệm chăm sóc sắc đẹp toàn diện",
    },
    {
        title: "Dịch vụ Nails",
        services: [
            {
                title: "Massage tay chân",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Nhúng bột nail",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn French",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn Ombre",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Móng úp nghệ thuật",
                image: images.service_1,
                href: "#",
            },
        ],
        description:
            "Gentle cung cấp dịch vụ làm nails và chăm sóc da tay chân để bạn trải nghiệm chăm sóc sắc đẹp toàn diện",
    },
    {
        title: "Dịch vụ Nails",
        services: [
            {
                title: "Massage tay chân",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Nhúng bột nail",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn French",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn Ombre",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Móng úp nghệ thuật",
                image: images.service_1,
                href: "#",
            },
        ],
        description:
            "Gentle cung cấp dịch vụ làm nails và chăm sóc da tay chân để bạn trải nghiệm chăm sóc sắc đẹp toàn diện",
    },
    {
        title: "Dịch vụ Nails",
        services: [
            {
                title: "Massage tay chân",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Nhúng bột nail",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn French",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Sơn Ombre",
                image: images.service_1,
                href: "#",
            },
            {
                title: "Móng úp nghệ thuật",
                image: images.service_1,
                href: "#",
            },
        ],
        description:
            "Gentle cung cấp dịch vụ làm nails và chăm sóc da tay chân để bạn trải nghiệm chăm sóc sắc đẹp toàn diện",
    },
];

function NailService() {
    return (
        <>
            {servicesList?.map((service, index) => (
                <Grid
                    key={index}
                    container
                    className={cx("service-wrapper")}
                    spacing={2}
                >
                    <Grid item xs={12} className={cx("title")}>
                        <h2>{service?.title}</h2> <b></b>
                    </Grid>
                    <Grid item xs={12} className={cx("description")}>
                        <p>{service?.description}</p>
                    </Grid>
                    {service?.services?.map((serviceDetail, index) => (
                        <Grid item lg={3} md={6} sm={6} xs={6} key={index}>
                            <a
                                href={serviceDetail?.href}
                                className={cx("service-item")}
                            >
                                <div className={cx("service-img")}>
                                    <img src={serviceDetail?.image} alt="" />
                                </div>
                                <div className={cx("service-title")}>
                                    <h5>{serviceDetail?.title}</h5>
                                </div>
                            </a>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </>
    );
}

export default NailService;
