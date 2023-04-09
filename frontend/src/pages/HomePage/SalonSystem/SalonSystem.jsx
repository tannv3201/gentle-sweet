import React from "react";
import classNames from "classnames/bind";
import styles from "./SalonSystem.module.scss";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs from "../../../components/TabPanel/Tabs";
import MyTab from "../../../components/TabPanel/Tab";
import { salonSystem } from "./FakeData";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
const cx = classNames.bind(styles);

function SalonSystem() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <div className={cx("salon-system-wrapper")}>
            <div
                style={
                    !isMedium
                        ? { width: "calc(var(--default-layout-width) + 48px)" }
                        : {}
                }
                className={cx("salon-system-inner")}
            >
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
                    <AppBar
                        style={{ overflow: "hidden" }}
                        position="static"
                        color="default"
                    >
                        <div className={cx("header-tabs")}>
                            <MyTabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
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
                        </div>
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
