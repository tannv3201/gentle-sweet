import React, { useState } from "react";
import styles from "./OutstandingService.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { ArrowForwardRounded, FormatQuoteRounded } from "@mui/icons-material";
import images from "../../../assets/images";
import { useEffect } from "react";
import { getAllService } from "../../../redux/api/apiService";
import { getAllServiceCategory } from "../../../redux/api/apiServiceCategory";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../LocalConstants";

const cx = classNames.bind(styles);

function ServiceItem({ imageSrc, title, serviceId }) {
    const navigate = useNavigate();
    const handleNavigateToServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };
    return (
        <div
            className={cx("service-wrapper")}
            onClick={() => handleNavigateToServiceDetail(serviceId)}
        >
            <div className={cx("service-img")}>
                <img src={imageSrc} alt="" />
            </div>
            <div className={cx("service-info")}>
                <div className={cx("service-title")}>
                    <h3>{title}</h3>
                </div>
                <a className={cx("service-see-detail")} href="#">
                    Xem chi tiết
                </a>
            </div>
        </div>
    );
}

function OutstandingService() {
    const [outstandingService, setOutstandingService] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );
    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );
    useEffect(() => {
        const fetch = async () => {
            if (serviceList?.length === 0) {
                await getAllService(null, dispatch, null);
            }
            if (serviceCategoryList?.length === 0) {
                await getAllServiceCategory(null, dispatch, null);
            }
        };
        fetch();
    }, []);
    useEffect(() => {
        if (serviceList) {
            const hairService = serviceList?.filter(
                (s) => s.service_category_id === 4
            );
            const nailService = serviceList?.filter(
                (s) => s.service_category_id === 6
            );
            setOutstandingService([
                ...hairService?.slice(0, 3),
                ...nailService?.slice(0, 3),
            ]);
        }
    }, [serviceList]);
    return (
        <div className={cx("outstanding-service-wrapper")}>
            <div className={cx("outstanding-service-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12} className={cx("title")}>
                        <b></b>
                        <h2>Dịch vụ nổi bật</h2>
                        <b></b>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={12}
                        md={12}
                        className={cx("sub-title")}
                    >
                        <p>
                            <FormatQuoteRounded
                                style={{
                                    color: "var(--primary-500)",
                                    transform: "scaleX(-1)",
                                    marginRight: "4px",
                                }}
                            />
                            Đánh thức vẻ đẹp tiềm ẩn bên trong bạn với sự phục
                            vụ tận tâm của chúng tôi.
                            <FormatQuoteRounded
                                style={{
                                    color: "var(--primary-500)",
                                    marginLeft: "4px",
                                }}
                            />
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {outstandingService?.map((service, idx) => (
                        <Grid
                            item
                            lg={4}
                            md={6}
                            sm={12}
                            xs={12}
                            key={service?.id}
                        >
                            <ServiceItem
                                imageSrc={`${API_IMAGE_URL}/${service?.image_url}`}
                                title={service?.name}
                                serviceId={service?.id}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={cx("outstanding-service-see-more")}>
                    <div
                        onClick={() => navigate("/danh-muc-dich-vu")}
                        className={cx("see-more-btn")}
                    >
                        <span>Xem thêm</span> <ArrowForwardRounded />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutstandingService;
