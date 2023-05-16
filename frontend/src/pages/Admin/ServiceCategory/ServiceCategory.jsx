import React from "react";
import { useState } from "react";
import ServiceCategoryList from "./ServiceCategoryList";
import CreateUpdateServiceCategoryModal from "./CreateUpdateServiceCategoryModal";

export default function ServiceCategory() {
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
            <ServiceCategoryList />
            <CreateUpdateServiceCategoryModal
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
