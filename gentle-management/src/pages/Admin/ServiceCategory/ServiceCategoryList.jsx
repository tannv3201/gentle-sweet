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
import CreateUpdateServiceCategoryModal from "./CreateUpdateServiceCategoryModal";
import { getAllServiceCategory } from "../../../redux/api/apiServiceCategory";
import DeleteServiceCategoryPopup from "./DeleteServiceCategoryPopup";
import { API_IMAGE_URL } from "../../../LocalConstants";
import styles from "./ServiceCategory.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function ServiceCategoryList({ data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedServiceCategory, setSelectedServiceCategory] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken && serviceCategoryList?.length === 0) {
            getAllServiceCategory(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    useEffect(() => {
        setCloneData(structuredClone(serviceCategoryList));
    }, [serviceCategoryList]);

    // Create update modal
    const [isOpenCreateUpdateModel, setIsOpenCreateUpdateModel] =
        useState(false);

    const handleOpenCreateUpdateModal = (rowData) => {
        setSelectedServiceCategory({
            id: rowData.id,
            name: rowData.name,
            description: rowData.description,
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
        setSelectedServiceCategory({
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
                Thêm danh mục dịch vụ
            </GButton>
            <br />
            <br />
            <GTable
                title={"DANH MỤC DỊCH VỤ"}
                columns={[
                    {
                        title: "Hình ảnh",
                        field: "image",
                        export: false,
                        render: (rowData) => (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                                src={`${API_IMAGE_URL}/logo_text.png`}
                                style={{
                                    width: 60,
                                    height: 60,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "1px solid var(--primary-400)",
                                }}
                            />
                        ),
                    },
                    { title: "Tên danh mục", field: "name" },
                    {
                        title: "Mô tả",
                        field: "description",
                        render: (rowData) => {
                            return (
                                <>
                                    <div
                                        className={cx(
                                            "service-category-description"
                                        )}
                                    >
                                        {rowData.description}
                                    </div>
                                </>
                            );
                        },
                    },
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
                                        onClick={() =>
                                            handleOpenCreateUpdateModal(rowData)
                                        }
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
                            </div>
                        ),
                    },
                ]}
                data={cloneData || []}
                exportFileName={"DanhSachNguoiDung"}
            />

            <CreateUpdateServiceCategoryModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
                selectedServiceCategory={selectedServiceCategory}
            />

            <DeleteServiceCategoryPopup
                isOpen={isOpenDeleteConfirmPopup}
                handleOpen={handleOpenDeleteConfirmPopup}
                handleClose={handleCloseDeleteConfirmPopup}
                selectedProductCategory={selectedServiceCategory}
            />
        </>
    );
}
