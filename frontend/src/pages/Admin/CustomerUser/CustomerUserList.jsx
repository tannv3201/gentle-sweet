import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import CreateUpdateAdminUser from "./CreateUpdateCustomerUser";
import DeleteAdminUser from "./DeleteCustomerUser";
import PasswordMenu from "./PasswordMenu/PasswordMenu";
import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import { getAllCustomerUser } from "../../../redux/api/apiCustomerUser";
import moment from "moment";

export default function CustomerUserList() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllCustomerUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    useEffect(() => {
        const newList = customerUserList.map((user) => {
            return {
                ...user,
                fullName: user?.last_name + " " + user?.first_name,
            };
        });

        setCloneData(structuredClone(newList));
    }, [customerUserList]);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setSelectedUser({
            id: rowData?.id,
            username: rowData?.username,
            password: "",
            confirmPassword: "",
            first_name: rowData?.first_name,
            last_name: rowData?.last_name,
            phone_number: rowData?.phone_number,
            province: rowData?.province,
            district: rowData?.district,
            ward: rowData?.ward,
            detail_address: rowData?.detail_address,
            birth_date: rowData?.birth_date ? dayjs(rowData?.birth_date) : null,
            email: rowData?.email,
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

    return (
        <>
            <GButton onClick={handleOpenCreateUpdateModal}>
                Thêm khách hàng
            </GButton>
            <br />
            <br />
            <GTable
                title={"DANH SÁCH KHÁCH HÀNG HỆ THỐNG"}
                columns={[
                    { title: "Họ và tên", field: "fullName" },
                    { title: "Số điện thoại", field: "phone_number" },
                    { title: "Địa chỉ", field: "detail_address" },
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
                selectedCustomerUser={selectedUser}
            />

            <DeleteAdminUser
                isOpen={isOpenDeleteConfirmModel}
                handleOpen={handleCloseDeleteConfirmModal}
                handleClose={handleCloseDeleteConfirmModal}
                selectedCustomerUser={selectedUser}
            />
        </>
    );
}
