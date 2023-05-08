import React from "react";
import AdminUserList from "./AdminUserList";
import CreateUpdateAdminUser from "./CreateUpdateAdminUser";
import GButton from "../../../components/MyButton/MyButton";
import { useState } from "react";

function AdminUser() {
    const [isOpenModelCreateUpdate, setIsOpenModelCreateUpdate] =
        useState(false);

    const handleOpenModal = () => {
        setIsOpenModelCreateUpdate(true);
    };

    const handleCloseModal = () => {
        setIsOpenModelCreateUpdate(false);
    };

    return (
        <>
            <GButton onClick={handleOpenModal}>Thêm mới nhân viên</GButton>
            <br />
            <br />
            <AdminUserList />
            <CreateUpdateAdminUser
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}

export default AdminUser;
