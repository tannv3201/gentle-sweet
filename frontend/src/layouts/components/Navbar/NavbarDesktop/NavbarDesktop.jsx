import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import styles from "./NavbarDesktop.module.scss";
import classNames from "classnames/bind";
import { Grid, IconButton } from "@mui/material";
import images from "../../../../assets/images";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchRounded } from "@mui/icons-material";
import { MenuList } from "../navigation";
import InfoSaleSlider from "../InfoSaleSlider/InforSaleSlider";
import MenuUser from "../MenuUser/MenuUser";
import { useSelector } from "react-redux";
import MenuCart from "../MenuCart/MenuCart";
import ServiceMenuDropdown from "../ServiceMenuDropdown/ServiceMenuDropdown";

const cx = classNames.bind(styles);

function NavbarDesktop() {
    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        const newList = serviceCategoryList?.map((category) => {
            const serviceByCategory = serviceList?.filter(
                (service) => service?.service_category_id === category?.id
            );
            return {
                serviceCategoryId: category?.id,
                name:
                    category?.name.toLocaleLowerCase() ===
                    "Danh mục dịch vụ chăm sóc tóc".toLocaleLowerCase()
                        ? "Dịch vụ tóc"
                        : category?.name.toLocaleLowerCase() ===
                          "Danh mục dịch vụ chăm sóc móng".toLocaleLowerCase()
                        ? "Dịch vụ nails"
                        : "",
                serviceList: serviceByCategory,
            };
        });
        setMenuList(
            structuredClone([
                ...MenuList,
                { name: "Dịch vụ", children: newList, to: "/danh-muc-dich-vu" },
            ])
        );
    }, [serviceCategoryList, serviceList]);
    const navigate = useNavigate();
    const handleNavigateServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };
    const handleNavigateServiceCategory = (to, serviceCategoryId) => {
        if (to) {
            navigate(to);
            return;
        }
        navigate(`/danh-muc-dich-vu/${serviceCategoryId}`);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("navbar-container")}>
                <div className={cx("navbar-content")}>
                    <Grid container>
                        <Grid item xs={2}>
                            <div
                                title="Trang chủ"
                                className={cx("logo-wrapper")}
                            >
                                <a href="/">
                                    <img
                                        className={cx("logo")}
                                        src={images.logo}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Grid>
                        <Grid item xs={7}>
                            <div className={cx("menu-list")}>
                                {menuList?.map((menu, idx) => (
                                    <MenuItem
                                        key={idx}
                                        name={menu?.name}
                                        to={menu?.to}
                                        multiLevel={idx === 4}
                                        menuDropDown={
                                            menu?.children && (
                                                <Grid container spacing={2}>
                                                    {menu?.children?.map(
                                                        (children, idx) => (
                                                            <Grid
                                                                key={
                                                                    children.id
                                                                        ? children.id
                                                                        : idx
                                                                }
                                                                item
                                                                className={cx(
                                                                    "menu-dropdown-item-container"
                                                                )}
                                                                xs={
                                                                    children?.serviceList
                                                                        ? 6
                                                                        : 12
                                                                }
                                                            >
                                                                <div>
                                                                    <Grid
                                                                        container
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                        >
                                                                            <div
                                                                                title={
                                                                                    children?.name
                                                                                }
                                                                                onClick={() => {
                                                                                    handleNavigateServiceCategory(
                                                                                        children?.to,
                                                                                        children?.serviceCategoryId
                                                                                    );
                                                                                }}
                                                                                className={
                                                                                    children?.serviceList
                                                                                        ? cx(
                                                                                              "menu-parent-item",
                                                                                              "hasChild"
                                                                                          )
                                                                                        : cx(
                                                                                              "menu-parent-item"
                                                                                          )
                                                                                }
                                                                            >
                                                                                {
                                                                                    children?.name
                                                                                }
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            container
                                                                            className={cx(
                                                                                "menu-children-list"
                                                                            )}
                                                                        >
                                                                            <Grid
                                                                                item
                                                                                container
                                                                                xs={
                                                                                    12
                                                                                }
                                                                            >
                                                                                {children?.serviceList?.map(
                                                                                    (
                                                                                        service,
                                                                                        index
                                                                                    ) => (
                                                                                        <Grid
                                                                                            key={
                                                                                                service?.id
                                                                                            }
                                                                                            item
                                                                                            xs={
                                                                                                12
                                                                                            }
                                                                                            onClick={() =>
                                                                                                handleNavigateServiceDetail(
                                                                                                    service?.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <span
                                                                                                className={cx(
                                                                                                    "menu-children-item"
                                                                                                )}
                                                                                            >
                                                                                                {
                                                                                                    service?.name
                                                                                                }
                                                                                            </span>
                                                                                        </Grid>
                                                                                    )
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                        )
                                                    )}
                                                </Grid>
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={cx("action-group")}>
                                <IconButton title="Tìm kiếm" size="large">
                                    <SearchRounded />
                                </IconButton>
                                <MenuCart />
                                <MenuUser />
                                <span>
                                    <NavLink
                                        className={cx("booking-btn")}
                                        to="/dat-lich"
                                    >
                                        Đặt lịch
                                    </NavLink>
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <InfoSaleSlider />
        </div>
    );
}

export default NavbarDesktop;
