import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import {
    createAdminUser,
    getAdminUserById,
    updateAdminUser,
} from "../../../../redux/api/apiAdminUser";
import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import styles from "./ServiceDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../../LocalConstants";

import GButton from "../../../../components/MyButton/MyButton";
import { ArrowBackIosNew, ModeEditOutlineRounded } from "@mui/icons-material";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import ActionMenu from "./ActionMenu/ActionMenu";
import { ImageUpload } from "../DropZone/CustomDropzone";

import { getAllDiscount } from "../../../../redux/api/apiDiscount";
import { getAllServiceCategory } from "../../../../redux/api/apiServiceCategory";
import {
    getServiceById,
    updateService,
} from "../../../../redux/api/apiService";

const cx = classNames.bind(styles);

export default function ServiceDetail() {
    const { serviceId } = useParams();
    dayjs.extend(utc);
    const [isEditting, setIsEditting] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getService = useSelector((state) => state.service.service?.service);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cloneData, setCloneData] = useState([]);

    const [imageFileSeleted, setImageFileSeleted] = useState([]);

    const serviceCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.serviceCategory.serviceCategory?.serviceCategoryList
        )
    );

    useEffect(() => {
        if (serviceCategoryList?.length === 0) {
            getAllServiceCategory(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    useEffect(() => {
        if (getService) {
            const discountId = parseInt(getService?.discount_id);
            const getDiscount = discountList?.find(
                (item) => item?.id === discountId
            );

            const service_category = serviceCategoryList?.find(
                (item) => item?.id === getService?.service_category_id
            );
            const cloneProduct = {
                ...getService,
                service_category_name: service_category?.name,
                discount_name: getDiscount?.name,
            };
            setCloneData(structuredClone(cloneProduct));
        }
    }, [getService]);

    const [service, setService] = useState({
        service_category_id: "",
        service_category_name: "",
        name: "",
        description: "",
        price: "",
        image_url: "",
    });
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleChangeServiceCategory = (value) => {
        if (value) {
            formik.setFieldValue("service_category_id", value?.id);
            formik.setFieldValue("service_category_name", value?.name);
        } else {
            formik.setFieldValue("service_category_id", null);
            formik.setFieldValue("service_category_name", null);
        }
    };

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        setImageFileSeleted(imageList);
    };
    useEffect(() => {
        if (discountList?.length === 0) {
            getAllDiscount(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const discountList = structuredClone(
        useSelector((state) => state.discount.discount?.discountList)
    );

    const getCurrDiscount = () => {
        const discountId = parseInt(cloneData?.discount_id);
        const getDiscount = discountList?.find(
            (item) => item?.id === discountId
        );
        return getDiscount;
    };

    const handleUpdateService = async (data) => {
        let discountPrice;
        if (cloneData?.discount_id && data?.price !== cloneData?.price) {
            const getDiscount = getCurrDiscount();
            discountPrice =
                data?.price -
                (getDiscount?.discount_percent * data?.price) / 100;
        } else {
            discountPrice = cloneData?.price_onsale;
        }

        if (imageFileSeleted?.length !== 0) {
            const formData = new FormData();
            formData.append("image", imageFileSeleted[0]?.file);
            formData.append("name", data?.name);
            formData.append("description", data?.description);
            formData.append("service_category_id", data?.service_category_id);
            formData.append("price", data?.price);
            formData.append("price_onsale", discountPrice);

            await updateService(
                user?.accessToken,
                dispatch,
                serviceId,
                formData,
                axiosJWT
            ).then(() => {
                setImageFileSeleted([]);
                setIsEditting(false);
            });
        } else {
            await updateService(
                user?.accessToken,
                dispatch,
                serviceId,
                { ...data, price_onsale: discountPrice },
                axiosJWT
            ).then(() => {
                setImageFileSeleted([]);
                setIsEditting(false);
            });
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: service,
        // validationSchema: validationSchema,
        onSubmit: async (data) => {
            const { service_category_name, price_onsale, ...restData } = data;
            handleUpdateService(restData);
        },
    });

    // Set selected province/district/ward into states & Formik field
    useEffect(() => {
        setService({
            id: cloneData?.id,
            name: cloneData?.name,
            service_category_id: cloneData?.service_category_id,
            service_category_name: cloneData?.service_category_name,
            description: cloneData?.description,
            price: cloneData?.price,
            price_onsale: cloneData?.price_onsale,
            image_url: cloneData?.image_url,
        });
    }, [cloneData]);

    useEffect(() => {
        if (serviceId) {
            getServiceById(dispatch, serviceId, user?.accessToken, axiosJWT);
        }
    }, [serviceId]);

    const handleBack = () => {
        navigate("/service");
    };

    return (
        <>
            <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                Trở lại
            </GButton>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-header")}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={cx("wrapper-left-header")}>
                                <div className={cx("user-avatar")}>
                                    <img
                                        src={
                                            cloneData?.image_url
                                                ? `${API_IMAGE_URL}/${cloneData?.image_url}`
                                                : ""
                                        }
                                        alt=""
                                    />
                                </div>
                                {cloneData?.discount_name && (
                                    <div className={cx("sale")}>
                                        <div className={cx("sale-label")}>
                                            SALE
                                        </div>
                                        <span
                                            className={cx("sale-desctiption")}
                                        >
                                            {cloneData?.discount_name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                        >
                            {!isEditting ? (
                                <div className={cx("button-list")}>
                                    {user?.role_id <= 2 && (
                                        <GButton
                                            onClick={() => setIsEditting(true)}
                                            startIcon={
                                                <ModeEditOutlineRounded />
                                            }
                                            color={"success"}
                                        >
                                            Chỉnh sửa
                                        </GButton>
                                    )}
                                    <ActionMenu selectedProduct={cloneData} />
                                </div>
                            ) : (
                                <span className={cx("label-editting")}>
                                    CẬP NHẬT THÔNG TIN
                                </span>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("wrapper-body")}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disabled={!isEditting}
                                    options={serviceCategoryList}
                                    onBlur={formik.handleBlur}
                                    getOptionLabel={(option) =>
                                        `${option?.name}` || ""
                                    }
                                    onChange={(e, value) => {
                                        handleChangeServiceCategory(value);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        value === null ||
                                        value === "" ||
                                        option?.id === value?.id
                                    }
                                    value={
                                        (formik.values.service_category_id && {
                                            id: formik.values
                                                ?.service_category_id,
                                            name: formik.values
                                                ?.service_category_name,
                                        }) ||
                                        null
                                    }
                                    renderInput={(params) => (
                                        <GTextFieldNormal
                                            {...params}
                                            disabled={!isEditting}
                                            name="service_category_id"
                                            fullWidth
                                            label="Danh mục"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Tên sản phẩm"
                                    fullWidth
                                    name="name"
                                    value={formik.values?.name || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Giá gốc"
                                    type="number"
                                    fullWidth
                                    name="price"
                                    value={formik.values?.price || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    disabled
                                    onChange={formik.handleChange}
                                    label="Giá sale"
                                    type="number"
                                    fullWidth
                                    name="price_onsale"
                                    value={formik.values?.price_onsale || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    disabled={!isEditting}
                                    onChange={formik.handleChange}
                                    label="Mô tả"
                                    fullWidth
                                    name="description"
                                    value={formik.values?.description || ""}
                                    formik={formik}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            {isEditting && (
                                <Grid item xs={12}>
                                    <ImageUpload
                                        imageFileSeleted={imageFileSeleted}
                                        setImageFileSeleted={
                                            setImageFileSeleted
                                        }
                                        onChangeImage={onChangeImage}
                                    />
                                    {imageFileSeleted.length === 0 && (
                                        <span style={{ color: "red" }}>
                                            {formik.errors?.image}
                                        </span>
                                    )}
                                </Grid>
                            )}
                            {isEditting && (
                                <Grid
                                    item
                                    xs={12}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                >
                                    <div>
                                        <GButton
                                            color={"success"}
                                            type="submit"
                                        >
                                            Lưu
                                        </GButton>
                                        <GButton
                                            style={{ marginLeft: "12px" }}
                                            color="text"
                                            onClick={() => {
                                                formik.resetForm();
                                                setIsEditting(false);
                                            }}
                                        >
                                            Hủy
                                        </GButton>
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </div>
            </div>
        </>
    );
}
