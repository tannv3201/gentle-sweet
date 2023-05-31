import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ServiceMenuDropdown.module.scss";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function ServiceMenuDropdown() {
    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    const [serviceListClone, setServiceListClone] = useState([]);

    useEffect(() => {
        const newList = serviceCategoryList?.map((category) => {
            const serviceByCategory = serviceList?.filter(
                (service) => service?.service_category_id === category?.id
            );
            return {
                ...category,
                serviceList: serviceByCategory,
            };
        });
        setServiceListClone(structuredClone(newList));
    }, [serviceCategoryList, serviceList]);
    const navigate = useNavigate();
    const handleNavigateServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };
    const handleNavigateServiceCategory = (serviceCategoryId) => {
        navigate(`/danh-muc-dich-vu/${serviceCategoryId}`);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    {serviceListClone?.map((service) => (
                        <Grid key={service?.id} item xs={6}>
                            <div className={cx("service-wrapper")}>
                                <div
                                    onClick={() =>
                                        handleNavigateServiceCategory(
                                            service?.id
                                        )
                                    }
                                    className={cx("category-name")}
                                >
                                    <h3>
                                        {" "}
                                        {service?.name?.toLocaleLowerCase() ===
                                        "Danh mục dịch vụ chăm sóc tóc".toLocaleLowerCase()
                                            ? "Dịch vụ tóc"
                                            : service?.name?.toLocaleLowerCase() ===
                                              "Danh mục dịch vụ chăm sóc móng".toLocaleLowerCase()
                                            ? "Dịch vụ móng"
                                            : ""}
                                    </h3>
                                </div>
                                <ul className={cx("service-list")}>
                                    {service?.serviceList?.map((service) => (
                                        <li
                                            className={cx("service-item")}
                                            key={service?.id}
                                            onClick={() =>
                                                handleNavigateServiceDetail(
                                                    service?.id
                                                )
                                            }
                                        >
                                            <span>{service?.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default ServiceMenuDropdown;
