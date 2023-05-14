import React from "react";
import CustomerUserList from "./CustomerUserList";
import CreateUpdateAdminUser from "./CreateUpdateCustomerUser";
import { useState } from "react";

export default function CustomerUser() {
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
            <CustomerUserList />
            <CreateUpdateAdminUser
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
