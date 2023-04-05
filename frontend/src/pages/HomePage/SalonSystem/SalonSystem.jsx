import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SalonSystem.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs from "../../../components/TabPanel/Tabs";
import MyTab from "../../../components/TabPanel/Tab";

const cx = classNames.bind(styles);

const salonSystem = [
    {
        id: "HN",
        name: "Hà Nội",
        address: [
            {
                id: "HN1",
                name: "38 Phố Thái Thịnh, P. Ngã Tư Sở, Q. Đống Đa, Hà Nội",
                province: "Hà Nội",
                district: "Đống Đa",
                wards: "Ngã Tư Sở",
                image: images.salon_system_1,
                map: "https://www.google.com/maps/place/Seoul+Spa+H%C3%A0+N%E1%BB%99i/@21.0064766,105.8217922,19z/data=!4m5!3m4!1s0x0:0x24b3e951f024d0e9!8m2!3d21.0064763!4d105.8219221",
            },
        ],
    },
    {
        id: "TB",
        name: "Thái Bình",
        address: [
            {
                id: "TB1",
                name: "Kha Lý, Thụy Quỳnh, Thái Thụy, Thái bình",
                province: "Thái Bình",
                district: "Thái Thụy",
                wards: "Thụy Quỳnh",
                image: images.salon_system_1,
                map: "https://www.google.com/maps/place/Seoul+Spa+H%C3%A0+N%E1%BB%99i/@21.0064766,105.8217922,19z/data=!4m5!3m4!1s0x0:0x24b3e951f024d0e9!8m2!3d21.0064763!4d105.8219221",
            },
            {
                id: "TB2",
                name: "Trà Hồi, Thụy Bình, Thái Thụy, Thái bình",
                province: "Thái Bình",
                district: "Thái Thụy",
                wards: "Thụy Bình",
                image: images.salon_system_1,
                map: "https://www.google.com/maps/place/Seoul+Spa+H%C3%A0+N%E1%BB%99i/@21.0064766,105.8217922,19z/data=!4m5!3m4!1s0x0:0x24b3e951f024d0e9!8m2!3d21.0064763!4d105.8219221",
            },
            {
                id: "TB3",
                name: "Bài Kiện, Thụy Quỳnh, Thái Thụy, Thái bình",
                province: "Thái Bình",
                district: "Thái Thụy",
                wards: "Thụy Quỳnh",
                image: images.salon_system_1,
                map: "https://www.google.com/maps/place/Seoul+Spa+H%C3%A0+N%E1%BB%99i/@21.0064766,105.8217922,19z/data=!4m5!3m4!1s0x0:0x24b3e951f024d0e9!8m2!3d21.0064763!4d105.8219221",
            },
        ],
    },
];

function SalonSystem() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <div className={cx("salon-system-wrapper")}>
            <div className={cx("salon-system-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={cx("salon-system-title")}>
                        <b></b>
                        <h2>Hệ thống cửa hàng</h2>
                        <b></b>
                    </Grid>
                    <Grid item xs={12} className={cx("salon-system-sub-title")}>
                        <p>
                            Nhờ sự tin yêu của khách hàng, Gentle Beauty luôn có
                            lượng khách lớn ghé thăm.
                        </p>
                        <span className={cx("remind")}>
                            Quý khách vui lòng đặt lịch hẹn trước để được CHỦ
                            ĐỘNG – ƯU TIÊN – TIẾT KIỆM THỜI GIAN!
                        </span>
                    </Grid>
                </Grid>

                <div
                    style={{
                        boxShadow: "var(--primary-box-shadow) 0px 2px 8px",
                        borderRadius: "6px",
                    }}
                >
                    <AppBar position="static" color="default">
                        <MyTabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className={cx("tabspanel-container")}
                        >
                            {salonSystem.map((salon, index) => (
                                <MyTab
                                    bgPrimary
                                    key={index}
                                    label={salon.name}
                                    className={cx("tabpanel")}
                                />
                            ))}
                        </MyTabs>
                    </AppBar>
                    <div className={cx("tabpanel-container")}>
                        {salonSystem.map((salon, index) => (
                            <TabPanel
                                key={index}
                                value={tabIndex}
                                index={index}
                            >
                                <Grid container spacing={3}>
                                    {salon.address.map((address, index) => (
                                        <Grid
                                            key={index}
                                            item
                                            lg={6}
                                            md={12}
                                            sm={12}
                                        >
                                            <div className={cx("tab-panel")}>
                                                <div
                                                    className={cx(
                                                        "tabpanel-img"
                                                    )}
                                                >
                                                    <img
                                                        src={address?.image}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={cx(
                                                        "tabpanel-content"
                                                    )}
                                                >
                                                    <h5
                                                        className={cx(
                                                            "address-name"
                                                        )}
                                                    >
                                                        {address?.name}
                                                    </h5>
                                                    <p
                                                        className={cx(
                                                            "address-detail"
                                                        )}
                                                    >
                                                        {address?.name}
                                                    </p>
                                                    <a
                                                        href={address?.map}
                                                        className={cx(
                                                            "address-map"
                                                        )}
                                                    >
                                                        Xem đường đi
                                                    </a>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalonSystem;
