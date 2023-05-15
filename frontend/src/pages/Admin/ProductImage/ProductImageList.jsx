import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";

import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import CreateUpdateProductImageModal from "./CreateUpdateProductImageModal";
import DeleteProductImage from "./DeleteProductImage";
import { useParams } from "react-router-dom";
import { getAllProductImageByProductId } from "../../../redux/api/apiProductImage";

export default function ProductImageList({ data }) {
    const { productId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedProductImage, setSelectedProductImage] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const productImageList = useSelector(
        (state) => state.productImage.productImage?.productImageList
    );

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllProductImageByProductId(
                user?.accessToken,
                productId,
                dispatch,
                axiosJWT
            );
        }
    }, []);

    useEffect(() => {
        setCloneData(structuredClone(productImageList));
    }, [productImageList]);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setIsOpenCreateUpdateModel(true);
    };

    const handleCloseCreateUpdateModal = () => {
        setIsOpenCreateUpdateModel(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmPopup, setIsOpenDeleteConfirmPopup] =
        useState(false);

    const handleOpenDeleteConfirmPopup = (rowData) => {
        setSelectedProductImage({
            id: rowData?.id,
            image_url: rowData?.image_url,
        });
        setIsOpenDeleteConfirmPopup(true);
    };

    const handleCloseDeleteConfirmPopup = () => {
        setIsOpenDeleteConfirmPopup(false);
    };

    return (
        <>
            <GButton onClick={handleOpenCreateUpdateModal}>Thêm ảnh</GButton>
            <br />
            <br />
            <GTable
                title={"DANH MỤC SẢN PHẨM"}
                columns={[
                    {
                        title: "Hình ảnh",
                        field: "image",
                        export: false,
                        render: (rowData) => (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                                src={
                                    rowData?.image_url
                                        ? `http://localhost:8080/v1/productImage/images/${rowData?.image_url}`
                                        : ""
                                }
                                style={{
                                    width: 60,
                                    height: 60,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                        ),
                    },
                    { title: "Đường dẫn", field: "image_url" },
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
                                <LightTooltip placement="bottom" title="Xóa">
                                    <IconButton
                                        onClick={() => {
                                            console.log(rowData);
                                            handleOpenDeleteConfirmPopup(
                                                rowData
                                            );
                                        }}
                                    >
                                        <DeleteRoundedIcon color="error" />
                                    </IconButton>
                                </LightTooltip>
                            </div>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
            />

            <CreateUpdateProductImageModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedProductCategory={selectedProductImage}
            />

            <DeleteProductImage
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedProductCategory={selectedProductImage}
            />
        </>
    );
}