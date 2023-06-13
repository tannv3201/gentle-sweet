import React from "react";
import { useState } from "react";
import ProductCategoryList from "./ProductCategoryList";
import CreateUpdateProductCategoryModal from "./CreateUpdateProductCategoryModal";

export default function ProductCategory() {
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
            <ProductCategoryList />
            <CreateUpdateProductCategoryModal
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
