import React from "react";
import MaterialTable from "material-table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";

export default function AdminUserList({ data }) {
    return (
        <MaterialTable
            columns={[
                { title: "Họ", field: "last_name" },
                { title: "Tên", field: "first_name" },
                { title: "Tên đăng nhập", field: "username" },
            ]}
            data={data}
            options={{
                paging: false,
                search: false,
                toolbar: false,
                draggable: false,
                sorting: false,
                selection: true,
            }}
        />
    );
}
