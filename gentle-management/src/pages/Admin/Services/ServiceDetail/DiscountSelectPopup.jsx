import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../../components/MyButton/MyButton";
import { Autocomplete, Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../../common/GModal/GModal";
import { getAllDiscount } from "../../../../redux/api/apiDiscount";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { createAxios } from "../../../../createInstance";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import { addDiscount } from "../../../../redux/api/apiService";
export default function DiscountSelectPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        discount_id: "",
        discount_name: "",
    });

    const discountList = structuredClone(
        useSelector((state) => state.discount.discount?.discountList)
    );

    useEffect(() => {
        if (selectedProduct) {
            const discount_id = parseInt(selectedProduct?.discount_id);
            const discount = discountList?.find(
                (item) => item?.id === discount_id
            );

            const newSelectedProduct = {
                ...selectedProduct,
                discount_name: discount?.name,
                discount_id: discount_id,
            };
            setProduct(newSelectedProduct);
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (discountList?.length === 0) {
            getAllDiscount(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const handleChangeDiscount = (value) => {
        if (value) {
            formik.setFieldValue("discount_id", value?.id);
            formik.setFieldValue("discount_name", value?.name);
            formik.setFieldValue("discount_percent", value?.discount_percent);
        } else {
            formik.setFieldValue("discount_id", null);
            formik.setFieldValue("discount_name", null);
            formik.setFieldValue("discount_percent", null);
        }
    };

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Validate
    const validationSchema = Yup.object().shape({
        discount_id: Yup.string().required("Vui lòng không để trống"),
    });

    const handleAddDiscount = (data) => {
        const discountPrice =
            data?.price - (data?.discount_percent * data?.price) / 100;
        const discountData = {
            discount_id: data?.discount_id,
            price_onsale: discountPrice,
        };
        addDiscount(
            user?.accessToken,
            dispatch,
            data?.id,
            discountData,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };

    const handleDeleteDiscount = () => {
        const discountData = {
            discount_id: null,
            price_onsale: 0,
        };
        addDiscount(
            user?.accessToken,
            dispatch,
            selectedProduct?.id,
            discountData,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: product,
        onSubmit: (data) => {
            handleAddDiscount(data);
        },
    });

    return (
        <div>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={
                    selectedProduct?.id
                        ? "Thay đổi chương trình giảm giá"
                        : "Lựa chọn chương trình giảm giá"
                }
            >
                <div style={{ minWidth: 600 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={discountList}
                                    onBlur={formik.handleBlur}
                                    getOptionLabel={(option) =>
                                        `${option?.name}` || ""
                                    }
                                    onChange={(e, value) => {
                                        handleChangeDiscount(value);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        value === null ||
                                        value === "" ||
                                        option?.id === value?.id
                                    }
                                    value={
                                        (formik.values.discount_id && {
                                            id: formik.values?.discount_id,
                                            name: formik.values?.discount_name,
                                        }) ||
                                        null
                                    }
                                    renderInput={(params) => (
                                        <GTextFieldNormal
                                            {...params}
                                            name="discount_id"
                                            fullWidth
                                            label="Chọn chương trình"
                                            formik={formik}
                                        />
                                    )}
                                />
                            </Grid>
                            {product?.discount_id ? (
                                <Grid item xs={12}>
                                    <GButton
                                        onClick={handleDeleteDiscount}
                                        color={"error"}
                                    >
                                        Xóa giảm giá
                                    </GButton>
                                </Grid>
                            ) : (
                                ""
                            )}
                            <Grid item xs={12}>
                                <GButton color={"success"} type="submit">
                                    Lưu
                                </GButton>
                                <GButton
                                    style={{ marginLeft: "12px" }}
                                    color="text"
                                    onClick={() => {
                                        formik.resetForm();
                                        handleClose();
                                    }}
                                >
                                    Hủy
                                </GButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </GModal>
        </div>
    );
}
