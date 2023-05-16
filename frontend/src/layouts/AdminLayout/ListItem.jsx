import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";

export const mainListItems = (
    <React.Fragment>
        <MenuItem
            to={"/admin"}
            title={"Dashboard"}
            icon={<DashboardIcon />}
            end={true}
        />
        <MenuItem
            to={"/admin/admin-user"}
            title={"Nhân viên"}
            icon={<PeopleIcon />}
        />
        <MenuItem
            to={"/admin/customer"}
            title={"Khách hàng"}
            icon={<PeopleIcon />}
        />
        <MenuItem
            to={"/admin/product-category"}
            title={"Danh mục sản phẩm"}
            icon={<DashboardIcon />}
        />
        <MenuItem
            to={"/admin/product"}
            title={"Sản phẩm"}
            icon={<DashboardIcon />}
        />
        {/* <MenuItem
            to={"/admin/productImage"}
            title={"Hình ảnh"}
            icon={<DashboardIcon />}
        /> */}
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Báo cáo" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
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
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);
