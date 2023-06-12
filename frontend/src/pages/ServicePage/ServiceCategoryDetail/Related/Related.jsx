/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styles from "./Related.module.scss";
import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import images from "../../../../assets/images";

import GTextField from "../../../../components/GTextField/GTextField";
import GButton from "../../../../components/MyButton/MyButton";
import { useSelector } from "react-redux";
import { API_IMAGE_URL } from "../../../../LocalConstants";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Related() {
    const serviceList = useSelector(
        (state) => state.service.service.serviceListSearch
    );
    const [serviceListClone, setServiceListClone] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (serviceList)
            setServiceListClone(structuredClone(serviceList?.slice(0, 5)));
    }, [serviceList]);
    const handleNavigateServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div
                    style={{
                        position: "relative",
                        flex: "1",
                    }}
                >
                    <div
                        style={{
                            position: "sticky",
                            top: "102px",
                        }}
                    >
                        <div className={cx("advise-form-wrapper")}>
                            <div className={cx("advise-form")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <span className={cx("related-title")}>
                                            <h1>Dịch vụ liên quan</h1>
                                        </span>
                                    </Grid>
                                    {serviceListClone?.map((service, idx) => (
                                        <Grid item xs={12}>
                                            <div
                                                onClick={() =>
                                                    handleNavigateServiceDetail(
                                                        service?.id
                                                    )
                                                }
                                                className={cx("related-item")}
                                            >
                                                <div
                                                    className={cx(
                                                        "related-item-img"
                                                    )}
                                                >
                                                    <img
                                                        src={`${API_IMAGE_URL}/${service?.image_url}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={cx(
                                                        "related-item-content"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "related-item-content-title"
                                                        )}
                                                    >
                                                        <h5>{service?.name}</h5>
                                                    </span>
                                                    <p
                                                        className={cx(
                                                            "related-item-content-description"
                                                        )}
                                                    >
                                                        {service?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Related;
