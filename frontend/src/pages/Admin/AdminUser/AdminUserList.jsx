import React from "react";
import { EditRounded, DeleteRounded, InfoRounded } from "@mui/icons-material/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import PasswordMenu from "./PasswordMenu/PasswordMenu";
import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import { getAllUser } from "../../../redux/api/apiAdminUser";
import AdminUserInfoDetail from "./AdminUserInfoDetail/AdminUserInfoDetail";
import dayjs from "dayjs";
import CreateUpdateAdminUserModal from "./CreateUpdateAdminUserModal";
import DeleteAdminUserPopup from "./DeleteAdminUserPopup";

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
                    user?.role_id === 2
                        ? "ADMIN"
                        : user?.role_id === 3
                        ? "STAFF"
                        : "",
                fullName: user?.last_name + " " + user?.first_name,
            };
        });

        setCloneData(structuredClone(newList));
    }, [adminUserList]);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setSelectedUser({
            id: rowData.id,
            role_id: rowData.role_id || null,
            role_name:
                rowData.role_id === 2
                    ? "ADMIN"
                    : rowData.role_id === 3
                    ? "STAFF"
                    : "",
            username: rowData.username,
            last_name: rowData.last_name,
            first_name: rowData.first_name,
            phone_number: rowData?.phone_number,
            province: rowData?.province,
            district: rowData?.district,
            ward: rowData?.ward,
            detail_address: rowData?.detail_address,
            birth_date: rowData?.birth_date ? dayjs(rowData?.birth_date) : null,
            email: rowData.email,
            password: "",
            confirmPassword: "",
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
        setSelectedUser({
            id: rowData?.id,
            fullName: rowData?.last_name + " " + rowData?.first_name,
        });
        setIsOpenDeleteConfirmModel(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setIsOpenDeleteConfirmModel(false);
    };

    // Information Detail modal
    const [isOpenInfoDetailModel, setIsOpenInfoDetailModel] = useState(false);

    const handleOpenInfoDetailModal = (rowData) => {
        setSelectedUser({
            id: rowData.id,
            role_id: rowData.role_id || null,
            role_name:
                rowData.role_id === 2
                    ? "ADMIN"
                    : rowData.role_id === 3
                    ? "STAFF"
                    : "",
            username: rowData.username,
            last_name: rowData.last_name,
            first_name: rowData.first_name,
            phone_number: rowData?.phone_number,
            province: rowData?.province,
            district: rowData?.district,
            ward: rowData?.ward,
            detail_address: rowData?.detail_address,
            birth_date: rowData?.birth_date ? dayjs(rowData?.birth_date) : null,
            email: rowData.email,
            password: "",
            confirmPassword: "",
        });
        setIsOpenInfoDetailModel(true);
    };

    const handleCloseInfoDetailModal = () => {
        setIsOpenInfoDetailModel(false);
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
                        export: false,
                        render: (rowData) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <LightTooltip
                                    placement="bottom"
                                    title="Chi tiết"
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleOpenInfoDetailModal(rowData);
                                        }}
                                    >
                                        <InfoRounded color="info" />
                                    </IconButton>
                                </LightTooltip>
                                <LightTooltip
                                    placement="bottom"
                                    title="Chỉnh sửa"
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleOpenCreateUpdateModal(rowData)
                                        }
                                    >
                                        <EditRounded color="primary" />
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
                                        <DeleteRounded color="error" />
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

            <CreateUpdateAdminUserModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedUser={selectedUser}
            />

            <DeleteAdminUserPopup
                isOpen={isOpenDeleteConfirmModel}
                handleOpen={handleCloseDeleteConfirmModal}
                handleClose={handleCloseDeleteConfirmModal}
                selectedUser={selectedUser}
            />

            <AdminUserInfoDetail
                isOpen={isOpenInfoDetailModel}
                handleOpen={handleOpenInfoDetailModal}
                handleClose={handleCloseInfoDetailModal}
                selectedUser={selectedUser}
            />
        </>
    );
}
