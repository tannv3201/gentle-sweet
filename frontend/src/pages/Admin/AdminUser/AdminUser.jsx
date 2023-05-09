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

    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <>
            <GButton onClick={handleOpenModal}>Thêm mới nhân viên</GButton>
            <br />
            <br />
            <AdminUserList data={cloneData || []} />
            <CreateUpdateAdminUser
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}

export default AdminUser;
