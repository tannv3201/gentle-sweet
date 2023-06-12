import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import MenuItem from "./MenuItem";
import {
    CategoryRounded,
    ShoppingCart,
    People,
    BarChart,
    Layers,
    Assignment,
    Dashboard,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
export const MainListItems = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);

    return (
        <React.Fragment>
            <MenuItem
                to={"/admin"}
                title={"Dashboard"}
                icon={<Dashboard />}
                end={true}
            />
            {user?.role_id <= 2 && (
                <MenuItem
                    to={"/admin/admin-user"}
                    title={"Nhân viên"}
                    icon={<People />}
                />
            )}
            {user?.role_id <= 2 && (
                <MenuItem
                    to={"/admin/customer-user"}
                    title={"Khách hàng"}
                    icon={<People />}
                />
            )}
            {user?.role_id <= 2 && (
                <MenuItem
                    to={"/admin/product-category"}
                    title={"Danh mục sản phẩm"}
                    icon={<CategoryRounded />}
                />
            )}
            {user?.role_id <= 2 && (
                <MenuItem
                    to={"/admin/service-category"}
                    title={"Danh mục dịch vụ"}
                    icon={<CategoryRounded />}
                />
            )}
            <MenuItem
                to={"/admin/product"}
                title={"Sản phẩm"}
                icon={<Dashboard />}
            />
            <MenuItem
                to={"/admin/service"}
                title={"Dịch vụ"}
                icon={<Dashboard />}
            />
            {user?.role_id <= 2 && (
                <MenuItem
                    to={"/admin/discount"}
                    title={"Giảm giá"}
                    icon={<Dashboard />}
                />
            )}
            <MenuItem
                to={"/admin/invoice"}
                title={"Đơn hàng"}
                icon={<ShoppingCart />}
            />
            <MenuItem
                to={"/admin/booking"}
                title={"Đặt lịch"}
                icon={<ShoppingCart />}
            />

            <ListItemButton>
                <ListItemIcon>
                    <Layers />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const SecondaryListItems = () => {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </ListItemButton>
        </React.Fragment>
    );
};
