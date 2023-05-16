import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminUserReducer from "./slice/adminUserSlice";
import customerUserReducer from "./slice/customerUserSlice";
import productCategoryReducer from "./slice/productCategorySlice";
import serviceCategoryReducer from "./slice/serviceCategorySlice";
import productReducer from "./slice/productSlice";
import serviceReducer from "./slice/serviceSlice";
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
    service: serviceReducer,
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
