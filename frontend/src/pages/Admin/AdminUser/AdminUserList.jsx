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
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import PasswordMenu from "./PasswordMenu/PasswordMenu";
import { LightTooltip } from "../../../components/GTooltip/GTooltip";

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
        const newList = adminUserList.map((user) => {
            return {
                ...user,
                role_name:
                    user?.role_id === "eaff3c47-28b5-4315-8bc7-384b72fe039a"
                        ? "ADMIN"
                        : user?.role_id ===
                          "16d0f7f9-e6cc-42d3-b748-5930044b3893"
                        ? "STAFF"
                        : "",
                fullName: user?.last_name + " " + user?.first_name,
            };
        });

        setCloneData(structuredClone(newList));
    }, [adminUserList]);
    console.log(cloneData);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setSelectedUser({
            id: rowData.id,
            role_id: rowData.role_id,
            role_name:
                rowData.role_id === "eaff3c47-28b5-4315-8bc7-384b72fe039a"
                    ? "ADMIN"
                    : rowData.role_id === "16d0f7f9-e6cc-42d3-b748-5930044b3893"
                    ? "STAFF"
                    : "",
            username: rowData.username,
            last_name: rowData.last_name,
            first_name: rowData.first_name,
            email: rowData.email,
        });
        setIsOpenCreateUpdateModel(true);
    };

    const handleCloseCreateUpdateModal = () => {
        setIsOpenCreateUpdateModel(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmModel, setIsOpenDeleteConfirmModel] =
        useState(false);

    const handleOpenDeleteConfirmModal = (rowData) => {
        setSelectedUser(rowData);
        setIsOpenDeleteConfirmModel(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setIsOpenDeleteConfirmModel(false);
    };

    return (
        <>
            <GButton onClick={handleOpenCreateUpdateModal}>
                Thêm người dùng
            </GButton>
            <br />
            <br />
            <GTable
                title={"DANH SÁCH NGƯỜI DÙNG HỆ THỐNG"}
                columns={[
                    { title: "Họ và tên", field: "fullName" },
                    { title: "Tên đăng nhập", field: "username" },
                    { title: "Quyền hạn", field: "role_name" },
                    {
                        title: "Thao tác",
                        field: "actions",
                        sorting: false,
                        render: (rowData) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <LightTooltip
                                    placement="bottom"
                                    title="Chỉnh sửa"
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleOpenCreateUpdateModal(rowData)
                                        }
                                    >
                                        <EditRoundedIcon color="primary" />
                                    </IconButton>
                                </LightTooltip>
                                <LightTooltip placement="bottom" title="Xóa">
                                    <IconButton
                                        onClick={() => {
                                            handleOpenDeleteConfirmModal(
                                                rowData
                                            );
                                        }}
                                    >
                                        <DeleteRoundedIcon color="error" />
                                    </IconButton>
                                </LightTooltip>
                                <PasswordMenu selectedUser={rowData} />
                            </div>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
            />

            <CreateUpdateAdminUser
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedUser={selectedUser}
            />

            <ConfirmDeletePopup
                isOpen={isOpenDeleteConfirmModel}
                handleOpen={handleCloseDeleteConfirmModal}
                handleClose={handleCloseDeleteConfirmModal}
                selectedUser={selectedUser}
            />
        </>
    );
}
