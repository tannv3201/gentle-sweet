import React from "react";
import AdminUserList from "./AdminUserList";
import CreateUpdateAdminUser from "./CreateUpdateAdminUser";
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
