import React from "react";
import MaterialTable from "material-table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import { useMemo } from "react";

export default function AdminUserList() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adminUserList = useSelector(
        (state) => state.adminUser.adminUser?.allAdminUser
    );

    let cloneData = structuredClone(adminUserList);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    return (
        <MaterialTable
            columns={[
                { title: "Họ", field: "last_name" },
                { title: "Tên", field: "first_name" },
                { title: "Tên đăng nhập", field: "username" },
            ]}
            data={cloneData || []}
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
