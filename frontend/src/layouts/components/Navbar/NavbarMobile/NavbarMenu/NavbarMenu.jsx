import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./NavbarMenu.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuList } from "../../navigation";
import { IconButton } from "@mui/material";
import { ArrowBackIosNewRounded, ExpandMoreRounded } from "@mui/icons-material";

const cx = classNames.bind(styles);

function NavbarMenu({ setIsOpenDrawer }) {
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
    console.log(menuList);
    const handleNavigateServiceCategory = (serviceCategoryId) => {
        navigate(`/danh-muc-dich-vu/${serviceCategoryId}`);
    };

    const handleNavigate = (to) => {
        navigate(to);
    };
    const [isOpenChildMenu, setIsOpenChildMenu] = useState([]);

    const handleToggleChildMenu = (index) => {
        setIsOpenChildMenu((prev) => {
            const updatedState = [...prev];
            updatedState[index] = !prev[index];
            return updatedState;
        });
    };
    return (
        <>
            <div className={cx("wrapper")}>
                {menuList?.map((menu, idx) => (
                    <div className={cx("menu-item")} key={idx}>
                        <div
                            className={
                                isOpenChildMenu[idx]
                                    ? cx("menu-item-name", "isOpen")
                                    : cx("menu-item-name")
                            }
                        >
                            <span
                                className={cx("menu-name")}
                                onClick={() => {
                                    handleNavigate(menu?.to);
                                    setIsOpenDrawer(false);
                                }}
                            >
                                {menu?.name}
                            </span>
                            {menu?.children && (
                                <IconButton
                                    size="large"
                                    className={
                                        isOpenChildMenu[idx]
                                            ? cx("menu-btn", "rotate")
                                            : cx("menu-btn")
                                    }
                                    onClick={() => handleToggleChildMenu(idx)}
                                >
                                    <ExpandMoreRounded
                                        className={cx("btn-icon")}
                                    />
                                </IconButton>
                            )}
                        </div>
                        {menu?.children && (
                            <div
                                className={
                                    isOpenChildMenu[idx]
                                        ? cx("child-wrapper", "isOpen")
                                        : cx("child-wrapper")
                                }
                            >
                                {menu?.children?.map((child, idx) => (
                                    <span
                                        className={cx("child-item-name")}
                                        key={idx}
                                        onClick={() => {
                                            if (child?.serviceCategoryId) {
                                                setIsOpenDrawer(false);
                                                handleNavigateServiceCategory(
                                                    child?.serviceCategoryId
                                                );
                                            } else {
                                                setIsOpenDrawer(false);
                                                handleNavigate(child?.to);
                                            }
                                        }}
                                    >
                                        {child?.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default NavbarMenu;
