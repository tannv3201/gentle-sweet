import React from "react";
import AdminUserList from "./AdminUserList";
import CreateUpdateAdminUser from "./CreateUpdateAdminUser";
import GButton from "../../../components/MyButton/MyButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useEffect } from "react";
import { getAllUser } from "../../../redux/apiRequest";

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
