// import axios from "axios";
// import toast from "react-hot-toast";

// import {
//     loginFailed,
//     loginStart,
//     loginSuccess,
//     logoutFailded,
//     logoutStart,
//     logoutSuccess,
// } from "./authSlice";
// import {
//     getAdminUserStart,
//     getAdminUserSuccess,
//     getAdminUserFailed,
//     createAdminUserStart,
//     createAdminUserFailed,
//     createAdminUserSuccess,
//     deleteAdminUserStart,
//     deleteAdminUserSuccess,
//     deleteAdminUserFailed,
//     updateAdminUserStart,
//     updateAdminUserSuccess,
//     updateAdminUserFailed,
//     passwordChangeStart,
//     passwordChangeSuccess,
//     passwordChangeFailed,
//     resetPasswordStart,
//     resetPasswordSuccess,
//     resetPasswordFailed,
// } from "./adminUserSlice";
// import {
//     createProductFailed,
//     createProductStart,
//     createProductSuccess,
//     deleteProductFailed,
//     deleteProductStart,
//     deleteProductSuccess,
//     getAllProductFailed,
//     getAllProductStart,
//     getAllProductSuccess,
//     updateProductFailed,
//     updateProductStart,
//     updateProductSuccess,
// } from "./productSlice";

// import {
//     createProductCategoryFailed,
//     createProductCategoryStart,
//     createProductCategorySuccess,
//     deleteProductCategoryFailed,
//     deleteProductCategoryStart,
//     deleteProductCategorySuccess,
//     getAllProductCategoryFailed,
//     getAllProductCategoryStart,
//     getAllProductCategorySuccess,
//     updateProductCategoryFailed,
//     updateProductCategoryStart,
//     updateProductCategorySuccess,
// } from "./productCategorySlice";

// // ==========================================================================//
// // API: Auth
// export const loginUser = async (user, dispatch, navigate) => {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post("/v1/auth/login", user);
//         dispatch(loginSuccess(res.data));
//         if (
//             res.data?.role_name === "SUPER_ADMIN" ||
//             res.data?.role_name === "ADMIN" ||
//             res.data?.role_name === "STAFF"
//         ) {
//             navigate("/admin/");
//             toast.success(res.data.msg);
//         } else if (res.data?.status === 200) {
//             navigate("/");
//             toast.success(res.data.msg);
//         } else {
//             toast.error(res.data.msg);
//         }
//     } catch (error) {
//         dispatch(loginFailed());
//     }
// };

// export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
//     dispatch(logoutStart());
//     try {
//         await axiosJWT.post("/v1/auth/logout", id, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(logoutSuccess());
//         navigate("/");
//     } catch (error) {
//         dispatch(logoutFailded());
//     }
// };

// // ==========================================================================//
// // API: AdminUser
// export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
//     dispatch(getAdminUserStart());
//     try {
//         const res = await axiosJWT.get("/v1/adminUser", {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(getAdminUserSuccess(res?.data));
//         return res?.data?.length;
//     } catch (error) {
//         dispatch(getAdminUserFailed());
//     }
// };

// export const createAdminUser = async (
//     accessToken,
//     dispatch,
//     adminUserData,
//     axiosJWT
// ) => {
//     dispatch(createAdminUserStart());
//     try {
//         const res = await axiosJWT.post("/v1/adminUser", adminUserData, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(createAdminUserSuccess(res?.data));
//         if (res?.data?.status === 201) {
//             toast.success(res?.data?.msg);
//             getAllUser(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(createAdminUserFailed(error.response?.data));
//     }
// };

// export const updateAdminUser = async (
//     accessToken,
//     dispatch,
//     id,
//     adminUserData,
//     axiosJWT
// ) => {
//     dispatch(updateAdminUserStart());
//     try {
//         const res = await axiosJWT.put("/v1/adminUser/" + id, adminUserData, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(updateAdminUserSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllUser(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(updateAdminUserFailed(error.response?.data));
//     }
// };

// export const passwordChange = async (
//     accessToken,
//     dispatch,
//     id,
//     passwordData,
//     axiosJWT
// ) => {
//     dispatch(passwordChangeStart());
//     try {
//         const res = await axiosJWT.put(
//             "/v1/adminUser/passwordChange/" + id,
//             passwordData,
//             {
//                 headers: {
//                     token: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         dispatch(passwordChangeSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllUser(accessToken, dispatch, axiosJWT);
//         }
//         if (res?.data?.status === 401) {
//             toast.error(res?.data?.msg);
//         }
//         return res?.data;
//     } catch (error) {
//         dispatch(passwordChangeFailed(error.response?.data));
//     }
// };

// export const resetPassword = async (dispatch, id, accessToken, axiosJWT) => {
//     dispatch(resetPasswordStart());
//     try {
//         const res = await axiosJWT.put(
//             "/v1/adminUser/resetPassword/" + id,
//             {},
//             {
//                 headers: {
//                     token: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         dispatch(resetPasswordSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllUser(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(resetPasswordFailed(error.response?.data));
//     }
// };

// export const deleteAdminUser = async (dispatch, id, accessToken, axiosJWT) => {
//     dispatch(deleteAdminUserStart());
//     try {
//         const res = await axiosJWT.delete("/v1/adminUser/" + id, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(deleteAdminUserSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllUser(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(deleteAdminUserFailed(error.response?.data));
//     }
// };

// // ==========================================================================//
// // API: Product
// export const getAllProduct = async (accessToken, dispatch, axiosJWT) => {
//     dispatch(getAllProductStart());
//     try {
//         const res = await axiosJWT.get("/v1/product", {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(getAllProductSuccess(res?.data));
//         return res?.data?.length;
//     } catch (error) {
//         dispatch(getAllProductFailed());
//     }
// };

// export const createProduct = async (
//     accessToken,
//     dispatch,
//     productData,
//     axiosJWT
// ) => {
//     dispatch(createProductStart());
//     try {
//         const res = await axiosJWT.post("/v1/product", productData, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(createProductSuccess(res?.data));
//         if (res?.data?.status === 201) {
//             toast.success(res?.data?.msg);
//             getAllProduct(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(createProductFailed(error.response?.data));
//     }
// };

// export const updateProduct = async (
//     accessToken,
//     dispatch,
//     id,
//     productData,
//     axiosJWT
// ) => {
//     dispatch(updateProductStart());
//     try {
//         const res = await axiosJWT.put("/v1/product/" + id, productData, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(updateProductSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllProduct(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(updateProductFailed(error.response?.data));
//     }
// };

// export const deleteProduct = async (dispatch, id, accessToken, axiosJWT) => {
//     dispatch(deleteProductStart());
//     try {
//         const res = await axiosJWT.delete("/v1/product/" + id, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(deleteProductSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllProduct(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(deleteProductFailed(error.response?.data));
//     }
// };

// // ==========================================================================//
// // API: UPLOAD ảnh
// export const uploadImage = async (formData) => {
//     try {
//         const res = await axios.post(
//             "https://api.imgbb.com/1/upload",
//             formData,
//             {
//                 headers: {
//                     "content-type": "multipart/form-data",
//                 },
//                 params: {
//                     key: "a1376c9fbddb6821bb0a0d7884359357",
//                 },
//             }
//         );
//         if (res.data?.data?.display_url) {
//             toast.success("Thêm ảnh lên máy chủ thành công.");
//         }
//         return res.data?.data?.display_url;
//     } catch (error) {
//         console.log(error);
//     }
// };

// // ==========================================================================//
// // API: Product Category
// export const getAllProductCategory = async (
//     accessToken,
//     dispatch,
//     axiosJWT
// ) => {
//     dispatch(getAllProductCategoryStart());
//     try {
//         const res = await axiosJWT.get("/v1/productCategory", {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(getAllProductCategorySuccess(res?.data));
//         return res?.data?.length;
//     } catch (error) {
//         dispatch(getAllProductCategoryFailed());
//     }
// };

// export const createProductCategory = async (
//     accessToken,
//     dispatch,
//     productCategoryData,
//     axiosJWT
// ) => {
//     dispatch(createProductCategoryStart());
//     try {
//         const res = await axiosJWT.post(
//             "/v1/productCategory",
//             productCategoryData,
//             {
//                 headers: {
//                     token: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         dispatch(createProductCategorySuccess(res?.data));
//         if (res?.data?.status === 201) {
//             toast.success(res?.data?.msg);
//             getAllProductCategory(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(createProductCategoryFailed(error.response?.data));
//     }
// };

// export const updateProductCategory = async (
//     accessToken,
//     dispatch,
//     id,
//     productCategoryData,
//     axiosJWT
// ) => {
//     dispatch(updateProductCategoryStart());
//     try {
//         const res = await axiosJWT.put(
//             "/v1/productCategory/" + id,
//             productCategoryData,
//             {
//                 headers: {
//                     token: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         dispatch(updateProductCategorySuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllProductCategory(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(updateProductCategoryFailed(error.response?.data));
//     }
// };

// export const deleteProductCategory = async (
//     dispatch,
//     id,
//     accessToken,
//     axiosJWT
// ) => {
//     dispatch(deleteProductCategoryStart());
//     try {
//         const res = await axiosJWT.delete("/v1/productCategory/" + id, {
//             headers: {
//                 token: `Bearer ${accessToken}`,
//             },
//         });
//         dispatch(deleteProductCategorySuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getAllProductCategory(accessToken, dispatch, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(deleteProductCategoryFailed(error.response?.data));
//     }
// };
