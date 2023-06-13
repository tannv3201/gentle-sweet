import React from "react";
import AdminUserList from "./AdminUserList";
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
        </>
    );
}

export default AdminUser;
