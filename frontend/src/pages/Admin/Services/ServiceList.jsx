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
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import ActionMenu from "./ActionMenu/ActionMenu";
import { useParams } from "react-router-dom";
import { getAllService } from "../../../redux/api/apiService";
import DeleteServicePopup from "./DeleteServicePopup";
import CreateUpdateServiceModal from "./CreateUpdateServiceModal";

import { API_IMAGE_URL } from "../../../LocalConstants";

export default function ServiceList() {
    const { productId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
            }
            if (user?.accessToken) {
                await getAllService(user?.accessToken, dispatch, axiosJWT);
                // await getAllProductImageByProductId(
                //     user?.accessToken,
                //     productId,
                //     dispatch,
                //     axiosJWT
                // );
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCloneData(structuredClone(serviceList));
    }, [serviceList]);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setSelectedService({
            id: rowData?.id,
            name: rowData?.name,
            service_category_id: rowData?.service_category_id,
            description: rowData?.description,
            quantity: rowData?.quantity,
            price: rowData?.price,
            image_url: rowData?.image_url,
        });
        setIsOpenCreateUpdateModel(true);
    };

    const handleCloseCreateUpdateModal = () => {
        setIsOpenCreateUpdateModel(false);
    };

    // Delete confirm modal
    const [isOpenDeleteConfirmPopup, setIsOpenDeleteConfirmPopup] =
        useState(false);

    const handleOpenDeleteConfirmPopup = (rowData) => {
        setSelectedService({
            id: rowData.id,
            name: rowData.name,
            description: rowData.description,
        });
        setIsOpenDeleteConfirmPopup(true);
    };

    const handleCloseDeleteConfirmPopup = () => {
        setIsOpenDeleteConfirmPopup(false);
    };

    return (
        <>
            <GButton onClick={handleOpenCreateUpdateModal}>
                Thêm dịch vụ
            </GButton>
            <br />
            <br />
            <GTable
                title={"DANH SÁCH SẢN PHẨM"}
                columns={[
                    {
                        title: "Hình ảnh",
                        field: "image_url",
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
                    { title: "Tên sản phẩm", field: "name" },
                    { title: "Số lượng", field: "quantity" },
                    {
                        title: "Giá",
                        field: "price",
                        render: (rowData) => FormatCurrency(rowData?.price),
                    },
                    { title: "Mô tả", field: "description" },
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
                                <LightTooltip
                                    placement="bottom"
                                    title="Chỉnh sửa"
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleOpenCreateUpdateModal(
                                                rowData
                                            );
                                        }}
                                    >
                                        <EditRoundedIcon color="primary" />
                                    </IconButton>
                                </LightTooltip>
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
                                <ActionMenu selectedService={rowData} />
                            </div>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
            />

            <CreateUpdateServiceModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedService={selectedService}
            />

            <DeleteServicePopup
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedService={selectedService}
            />
        </>
    );
}
