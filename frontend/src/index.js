import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./assets/scss/Global.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
// axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.baseURL = "http://192.168.1.2:8080/";

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    // </React.StrictMode>
);
