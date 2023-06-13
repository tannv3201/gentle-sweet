import React from "react";
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
import { useParams } from "react-router-dom";
import CreateUpdateServiceImageModal from "./CreateUpdateServiceImageModal";
import DeleteServiceImagePopup from "./DeleteServiceImagePopup";
import { getAllServiceImageByServiceId } from "../../../redux/api/apiServiceImage";
import { API_IMAGE_URL } from "../../../LocalConstants";

export default function ServiceImageList({ data }) {
    const { serviceId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedServiceImage, setSelectedServiceImage] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const serviceImageList = useSelector(
        (state) => state.serviceImage.serviceImage?.serviceImageList
    );

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllServiceImageByServiceId(
                user?.accessToken,
                serviceId,
                dispatch,
                axiosJWT
            );
        }
    }, []);

    useEffect(() => {
        setCloneData(structuredClone(serviceImageList));
    }, [serviceImageList]);

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
        setSelectedServiceImage({
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
                                        ? `${API_IMAGE_URL}/${rowData?.image_url}`
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

            <CreateUpdateServiceImageModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedProductCategory={selectedServiceImage}
            />

            <DeleteServiceImagePopup
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedProductCategory={selectedServiceImage}
            />
        </>
    );
}
