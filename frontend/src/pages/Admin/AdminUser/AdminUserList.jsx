import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import CreateUpdateAdminUser from "./CreateUpdateAdminUser";

export default function AdminUserList({ data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const adminUserList = useSelector(
        (state) => state.adminUser.adminUser?.allAdminUser
    );

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    useEffect(() => {
        setCloneData(structuredClone(adminUserList));
    }, [adminUserList]);

    const [isOpenModelCreateUpdate, setIsOpenModelCreateUpdate] =
        useState(false);

    const handleOpenModal = (rowData) => {
        setSelectedUser(rowData);
        setIsOpenModelCreateUpdate(true);
    };

    const handleCloseModal = () => {
        setIsOpenModelCreateUpdate(false);
    };

    return (
        <>
            <GButton onClick={handleOpenModal}>Thêm người dùng</GButton>
            <br />
            <br />
            <GTable
                title={"DANH SÁCH NGƯỜI DÙNG HỆ THỐNG"}
                columns={[
                    { title: "Họ", field: "last_name" },
                    { title: "Tên", field: "first_name" },
                    { title: "Tên đăng nhập", field: "username" },
                    {
                        title: "Thao tác",
                        field: "actions",
                        sorting: false,
                        render: (rowData) => (
                            <>
                                <IconButton
                                    onClick={() => handleOpenModal(rowData)}
                                >
                                    <EditRoundedIcon color="primary" />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        console.log(rowData);
                                    }}
                                >
                                    <DeleteRoundedIcon color="error" />
                                </IconButton>
                            </>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
                actions={[
                    {
                        icon: () => <EditRoundedIcon />,
                        tooltip: "Sửa",
                        onClick: (event, rowData) =>
                            alert("You saved " + rowData.id),
                    },
                    {
                        icon: () => <DeleteRoundedIcon />,
                        tooltip: "Xóa",
                        onClick: (event, rowData) =>
                            alert("You want to delete " + rowData.id),
                    },
                ]}
            />

            <CreateUpdateAdminUser
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
                selectedUser={selectedUser}
            />
        </>
    );
}
