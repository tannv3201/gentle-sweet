import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminUserReducer from "./slice/adminUserSlice";
import customerUserReducer from "./slice/customerUserSlice";
import productCategoryReducer from "./slice/productCategorySlice";
import serviceCategoryReducer from "./slice/serviceCategorySlice";
import productReducer from "./slice/productSlice";
import invoiceReducer from "./slice/invoiceSlice";
import bookingReducer from "./slice/bookingSlice";
import invoiceDetailReducer from "./slice/invoiceDetailSlice";
import bookingDetailReducer from "./slice/bookingDetailSlice";
import discountReducer from "./slice/discountSlice";
import serviceReducer from "./slice/serviceSlice";
import cartReducer from "./slice/cartSlice";
import provinceReducer from "./slice/provinceSlice";
import productImageReducer from "./slice/productImageSlice";
import serviceImageReducer from "./slice/serviceImageSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    adminUser: adminUserReducer,
    customerUser: customerUserReducer,
    productCategory: productCategoryReducer,
    serviceCategory: serviceCategoryReducer,
    product: productReducer,
    invoice: invoiceReducer,
    cart: cartReducer,
    booking: bookingReducer,
    invoiceDetail: invoiceDetailReducer,
    bookingDetail: bookingDetailReducer,
    service: serviceReducer,
    province: provinceReducer,
    discount: discountReducer,
    productImage: productImageReducer,
    serviceImage: serviceImageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export let persistor = persistStore(store);

// Reset hết toàn bộ state khi logout
export const resetApp = () => {
    persistor.purge();
};
