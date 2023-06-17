import React, { useEffect } from "react";
import styles from "./ServiceDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GRating from "../../../components/GRating/GRating";
import { useState } from "react";
import { ListAltRounded } from "@mui/icons-material";
import GButton from "../../../components/MyButton/MyButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs from "../../../components/TabPanel/Tabs";
import MyTab from "../../../components/TabPanel/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";
import { toast } from "react-hot-toast";
import { getServiceById } from "../../../redux/api/apiService";
import Comments from "../../../components/Comments/Comments";
import ItemDetailDescription from "../../../components/ItemDetailDescription/ItemDetailDescription";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";
const cx = classNames.bind(styles);

function ServiceDetail() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const [serviceDetailClone, setProductDetailClone] = useState({});

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const { serviceId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const getService = useSelector((state) => state.service.service.service);
    const discountListCustomer = useSelector(
        (state) => state.discount.discount?.discountListCustomer
    );

    useEffect(() => {
        const fetch = async () => {
            await getServiceById(dispatch, serviceId, null, null);
            await getAllDiscountCustomer(dispatch);
        };
        fetch();
    }, [serviceId]);

    useEffect(() => {
        if (getService) {
            const discount = discountListCustomer?.find(
                (d) => d.id === parseInt(getService.discount_id)
            );
            const newServiceDetail = {
                ...getService,
                discount_percent: discount?.discount_percent,
            };
            setProductDetailClone(structuredClone(newServiceDetail));
        }
    }, [getService]);

    const navigate = useNavigate();
    const handleBooking = async () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập");
        } else {
            navigate("/dat-lich", {
                state: {
                    selectedService: serviceDetailClone,
                },
            });
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("service-briefing")}>
                            <Grid container spacing={4}>
                                <Grid item lg={5} md={12} sm={12} xs={12}>
                                    <div
                                        className={cx(
                                            "service-briefing-img-wrapper"
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                "service-briefing-img"
                                            )}
                                        >
                                            <img
                                                src={
                                                    serviceDetailClone.image_url
                                                        ? `${API_IMAGE_URL}/${serviceDetailClone?.image_url}`
                                                        : ""
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className={cx("")}></div>
                                    </div>
                                </Grid>
                                <Grid item lg={7} md={12} sm={12} xs={12}>
                                    <div
                                        className={cx(
                                            "service-briefing-content-wrapper"
                                        )}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "service-briefing-title"
                                                    )}
                                                >
                                                    <h2>
                                                        {
                                                            serviceDetailClone?.name
                                                        }
                                                    </h2>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "service-briefing-rating"
                                                    )}
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <GRating
                                                                quantitylabel
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <div
                                                                className={cx(
                                                                    "service-briefing-sold"
                                                                )}
                                                            >
                                                                <span
                                                                    className={cx(
                                                                        "service-sold-title"
                                                                    )}
                                                                >
                                                                    Đã đặt:
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "service-sold-quantity"
                                                                    )}
                                                                >
                                                                    {
                                                                        serviceDetailClone?.serviceQuantityBooked
                                                                    }
                                                                </span>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "service-briefing-price"
                                                    )}
                                                >
                                                    <span
                                                        className={
                                                            serviceDetailClone?.discount_percent
                                                                ? cx(
                                                                      "service-briefing-price-default",
                                                                      "onSale"
                                                                  )
                                                                : cx(
                                                                      "service-briefing-price-default"
                                                                  )
                                                        }
                                                    >
                                                        {FormatCurrency(
                                                            serviceDetailClone?.price
                                                        )}
                                                    </span>
                                                    {serviceDetailClone?.discount_percent && (
                                                        <>
                                                            <span
                                                                className={cx(
                                                                    "service-briefing-price-sale"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    serviceDetailClone?.price -
                                                                        (serviceDetailClone?.price *
                                                                            serviceDetailClone?.discount_percent) /
                                                                            100
                                                                )}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "sale-tag"
                                                                )}
                                                            >
                                                                {`Giảm ${serviceDetailClone?.discount_percent}%`}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "cart-action"
                                                    )}
                                                >
                                                    <Grid container spacing={1}>
                                                        <Grid
                                                            item
                                                            lg={6}
                                                            md={6}
                                                            sm={12}
                                                            xs={12}
                                                        >
                                                            <GButton
                                                                onClick={
                                                                    handleBooking
                                                                }
                                                                className={cx(
                                                                    "add-to-cart-btn"
                                                                )}
                                                                startIcon={
                                                                    !isMedium && (
                                                                        <ListAltRounded />
                                                                    )
                                                                }
                                                                variant="outlined"
                                                                fullWidth
                                                                size="large"
                                                                style={
                                                                    isMedium
                                                                        ? {
                                                                              padding:
                                                                                  "7px 2px",
                                                                          }
                                                                        : {}
                                                                }
                                                            >
                                                                Đặt lịch ngay
                                                            </GButton>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx("promotion")}
                                                >
                                                    <p
                                                        className={cx(
                                                            "promotion-title"
                                                        )}
                                                    >
                                                        Ưu đãi:
                                                    </p>
                                                    <ul
                                                        className={cx(
                                                            "promotion-content-list"
                                                        )}
                                                    >
                                                        <li
                                                            className={cx(
                                                                "promotion-content-item"
                                                            )}
                                                        >
                                                            {parseInt(
                                                                serviceDetailClone?.service_category_id
                                                            ) === 4
                                                                ? "Free gội đầu - mát xa đầu"
                                                                : "Free vệ sinh móng"}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("service-description")}>
                            <div className={cx("wrapper-appbar")}>
                                <AppBar
                                    style={{ overflow: "hidden" }}
                                    position="static"
                                    color="default"
                                >
                                    <div className={cx("header-tabs")}>
                                        <MyTabs
                                            value={tabIndex}
                                            onChange={handleTabChange}
                                            className={cx(
                                                "tabspanel-container"
                                            )}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                        >
                                            <MyTab
                                                bgPrimary
                                                label={"Mô tả"}
                                                className={cx("tabpanel")}
                                            />
                                            <MyTab
                                                bgPrimary
                                                label={"Đánh giá"}
                                                className={cx("tabpanel")}
                                            />
                                        </MyTabs>
                                    </div>
                                </AppBar>
                                <div className={cx("tabpanel-container")}>
                                    <TabPanel value={tabIndex} index={0}>
                                        <ItemDetailDescription
                                            itemDetail={serviceDetailClone}
                                        />
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        <Comments />
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ServiceDetail;
