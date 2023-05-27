import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import images from "../../assets/images";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BookingSummary from "./BookingSummary/BookingSummary";
import CustomerInformation from "./CustomerInformation/CustomerInformation";
import ServiceInformation from "./ServiceInformation/ServiceInformation";
import GentleInformation from "./GentleInformation/GentleInformation";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { createBooking } from "../../redux/api/apiBooking";
import { useDispatch } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { GFormatDate } from "../../components/GDatePicker/GDatePicker";
import { createBookingDetail } from "../../redux/api/apiBookingDetail";
import { toast } from "react-hot-toast";
const cx = classNames.bind(styles);

function Booking() {
    const theme = useTheme();
    const [checkoutInfo, setCheckoutInfo] = useState({
        service_id: "",
        fullName: "",
        phone_number: "",
        province: "",
        district: "",
        ward: "",
        detail_address: "",
    });
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Vui lòng không để trống"),
        phone_number: Yup.string()
            .matches(/^\d+$/, "Số điện thoại chỉ bao gồm các ký tự số")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        province: Yup.string().required("Vui lòng không để trống"),
        district: Yup.string().required("Vui lòng không để trống"),
        ward: Yup.string().required("Vui lòng không để trống"),
        detail_address: Yup.string().required("Vui lòng không để trống"),
    });

    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        const newBooking = await createBooking(
            user?.accessToken,
            dispatch,
            {
                customer_user_id: user?.id,
            },
            axiosJWT
        );
        const selectedService = location.state?.selectedService;
        const { service_id, start_time, end_time, date, ...data } = values;
        const newData = {
            booking_id: newBooking,
            service_id: service_id,
            start_time: start_time,
            end_time: end_time,
            date: GFormatDate(date, "YYYY-MM-DD"),
            unit_price:
                selectedService.price_onsale > 0
                    ? selectedService.price_onsale
                    : selectedService.price,
        };

        await createBookingDetail(
            newBooking,
            user?.accessToken,
            dispatch,
            newData,
            axiosJWT
        ).then(() => navigate("/quan-ly-lich-dat"));
    };
    return (
        <main>
            <div className={cx("booking-banner")}>
                <img src={images.banner_about_us} alt="" />
            </div>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Formik
                        initialValues={checkoutInfo}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            await handleSubmit(values);
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item lg={8} md={12} sm={12} xs={12}>
                                <div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomerInformation />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ServiceInformation />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <GentleInformation />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <BookingSummary />
                                </div>
                            </Grid>
                        </Grid>
                    </Formik>
                </div>
            </div>
        </main>
    );
}

export default Booking;
