import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
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
export const mainListItems = (
    <React.Fragment>
        <MenuItem
            to={"/admin"}
            title={"Dashboard"}
            icon={<Dashboard />}
            end={true}
        />
        <MenuItem
            to={"/admin/admin-user"}
            title={"Nhân viên"}
            icon={<People />}
        />
        <MenuItem
            to={"/admin/customer"}
            title={"Khách hàng"}
            icon={<People />}
        />
        <MenuItem
            to={"/admin/product-category"}
            title={"Danh mục sản phẩm"}
            icon={<CategoryRounded />}
        />
        <MenuItem
            to={"/admin/service-category"}
            title={"Danh mục dịch vụ"}
            icon={<CategoryRounded />}
        />
        <MenuItem
            to={"/admin/product"}
            title={"Sản phẩm"}
            icon={<Dashboard />}
        />
        {/* <MenuItem
            to={"/admin/productImage"}
            title={"Hình ảnh"}
            icon={<Dashboard />}
        /> */}
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChart />
            </ListItemIcon>
            <ListItemText primary="Báo cáo" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Layers />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
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
