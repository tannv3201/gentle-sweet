import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ServiceList.module.scss";
import images from "../../../../assets/images";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { getAllServiceCategory } from "../../../../redux/api/apiServiceCategory";
import { getAllService } from "../../../../redux/api/apiService";
import { API_IMAGE_URL } from "../../../../LocalConstants";
import { useNavigate } from "react-router-dom";
import ServiceItem from "../../ServiceItem/ServiceItem";

const cx = classNames.bind(styles);

function ServiceList() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [serviceListClone, setServiceListClone] = useState([]);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );
    console.log(serviceList);
    useEffect(() => {
        const fetch = async () => {
            await getAllService(user?.accessToken, dispatch, axiosJWT);
            await getAllServiceCategory(user?.accessToken, dispatch, axiosJWT);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (serviceCategoryList && serviceList) {
                const newList = serviceCategoryList?.map((category) => {
                    const services = serviceList?.filter(
                        (service) =>
                            service?.service_category_id === category?.id
                    );
                    return {
                        ...category,
                        serviceList:
                            services?.length >= 4
                                ? services?.slice(0, 4)
                                : services,
                    };
                });

                setServiceListClone(newList);
            }
        };
        fetch();
    }, [serviceCategoryList, serviceList]);

    const navigate = useNavigate();
    const handleNavigateServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };

    const handleNavigateServiceCategory = (serviceCategoryId) => {
        navigate(`/danh-muc-dich-vu/${serviceCategoryId}`);
    };
    return (
        <>
            {serviceListClone?.map((category, index) => (
                <Grid
                    key={category?.id}
                    container
                    className={cx("service-wrapper")}
                    spacing={2}
                >
                    <Grid item xs={12} className={cx("title")}>
                        <h2>{category?.name}</h2> <b></b>
                    </Grid>
                    <Grid item xs={12} className={cx("description")}>
                        <p>{category?.description}</p>
                    </Grid>
                    {category?.serviceList?.map((service, index) => (
                        <Grid
                            item
                            lg={3}
                            md={6}
                            sm={6}
                            xs={6}
                            key={service?.id}
                            onClick={() =>
                                handleNavigateServiceDetail(service?.id)
                            }
                        >
                            <ServiceItem
                                imgUrl={
                                    service?.image_url
                                        ? `${API_IMAGE_URL}/${service?.image_url}`
                                        : ""
                                }
                                name={service?.name}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <div
                            onClick={() =>
                                handleNavigateServiceCategory(category?.id)
                            }
                            className={cx("view-all-navigate")}
                        >
                            <span> Xem tất cả</span>
                        </div>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

export default ServiceList;
