import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { useState } from "react";
import GTable from "../../../common/GTable/GTable";
import { IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";

import { LightTooltip } from "../../../components/GTooltip/GTooltip";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { getAllService } from "../../../redux/api/apiService";
import DeleteServicePopup from "./DeleteServicePopup";
import CreateUpdateServiceModal from "./CreateUpdateServiceModal";

import { API_IMAGE_URL } from "../../../LocalConstants";
import styles from "./Service.module.scss";
import classNames from "classnames/bind";
import { InfoRounded } from "@mui/icons-material";
import FilterService from "./FilterService/FilterService";
const cx = classNames.bind(styles);

export default function ServiceList() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cloneData, setCloneData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState({});
    const [isFiltering, setIsFiltering] = useState(false);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
            }
            if (user?.accessToken && serviceList?.length === 0) {
                await getAllService(user?.accessToken, dispatch, axiosJWT);
            }
        };

        fetchData();
    }, []);

    const serviceListSearch = useSelector(
        (state) => state.service.service?.serviceListSearch
    );

    const location = useLocation();
    useEffect(() => {
        if (location.search) {
            setCloneData(structuredClone(serviceListSearch));
        } else if (!location.search) {
            setCloneData(structuredClone(serviceList));
        }
    }, [serviceList, serviceListSearch, isFiltering]);

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

    const handleNavigateProductDetail = (serviceId) => {
        navigate(`/service/${serviceId}`);
    };

    return (
        <>
            <div>
                <GButton
                    style={{ marginRight: 12 }}
                    onClick={handleOpenCreateUpdateModal}
                >
                    Thêm dịch vụ
                </GButton>
                <FilterService
                    isFiltering={isFiltering}
                    setIsFiltering={setIsFiltering}
                />
            </div>
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
                                    border: "1px solid var(--primary-400)",
                                }}
                            />
                        ),
                    },
                    { title: "Tên dịch vụ", field: "name" },
                    {
                        title: "Giá",
                        field: "price",
                        render: (rowData) => {
                            if (rowData?.discount_id) {
                                return (
                                    <div className={cx("service-price")}>
                                        <span
                                            className={cx(
                                                "service-default-price"
                                            )}
                                        >
                                            {FormatCurrency(rowData?.price)}
                                        </span>
                                        <span
                                            className={cx(
                                                "service-onsale-price"
                                            )}
                                        >
                                            {FormatCurrency(
                                                rowData?.price_onsale
                                            )}
                                        </span>
                                        <span className={cx("onsale-label")}>
                                            SALE
                                        </span>
                                    </div>
                                );
                            } else {
                                return FormatCurrency(rowData?.price);
                            }
                        },
                    },
                    {
                        title: "Mô tả",
                        field: "description",
                        render: (rowData) => {
                            return (
                                <>
                                    <div className={cx("service-description")}>
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
                                    title="Chi tiết"
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleNavigateProductDetail(
                                                rowData?.id
                                            );
                                        }}
                                    >
                                        <InfoRounded color="primary" />
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

            <CreateUpdateServiceModal
                isOpen={isOpenCreateUpdateModel}
                handleOpen={handleOpenCreateUpdateModal}
                handleClose={handleCloseCreateUpdateModal}
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
