import React from "react";
import { useState } from "react";
import ProductImageList from "./ProductImageList";
import CreateUpdateProductImageModal from "./CreateUpdateProductImageModal";
import { useParams } from "react-router-dom";

export default function ProductImage() {
    const { productId } = useParams();
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
            <ProductImageList />
            <CreateUpdateProductImageModal
                isOpen={isOpenModelCreateUpdate}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
