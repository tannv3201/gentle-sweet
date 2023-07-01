import React from "react";
import GButton from "../../../components/MyButton/MyButton";
import GModal from "../../../components/GModal/GModal";
import { useFormik } from "formik";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { cancelBooking, updateBooking } from "../../../redux/api/apiBooking";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateBookingDetail } from "../../../redux/api/apiBookingDetail";

function ConfirmCancelBookingPopup({
    handleClose,
    handleOpen,
    isOpen,
    booking,
    bookingDetail,
}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const validationSchema = Yup.object().shape({
        note: Yup.string().required("Vui lòng nhập lý do"),
    });

    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCancelBooking = async (data, msg) => {
        await updateBooking(
            user?.accessToken,
            dispatch,
            booking?.bookingId,
            data,
            axiosJWT
        );

        const { note, ...restData } = data;

        await updateBookingDetail(
            user?.accessToken,
            dispatch,
            bookingDetail?.id,
            booking?.bookingId,
            {
                ...restData,
                service_name: bookingDetail?.service_name,
                customer_email: user?.email,
                start_time: bookingDetail?.start_time,
                end_time: bookingDetail?.end_time,
                date: bookingDetail?.date,
                customer_name: user?.first_name,
                created_at: bookingDetail?.created_at,
            },
            axiosJWT
        ).then(() => {
            toast.success(msg);
            handleClose();
        });
    };
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            note: "",
        },
        onSubmit: async (data) => {
            let status;
            let msg;
            if (booking?.status === 1) {
                status = 6;
                msg = "Hủy lịch hẹn thành công";
            } else if (booking?.status === 2) {
                status = 7;
                msg = "Gửi yêu cầu hủy lịch hẹn thành công";
            }
            await handleCancelBooking({ ...data, status: status }, msg);
        },
    });
    return (
        <>
            <GModal
                handleClose={() => {
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Xác nhận hủy lịch hẹn"}
            >
                <div>
                    <div
                        style={isSmall ? {} : { padding: "12px 0", width: 400 }}
                    >
                        {` Bạn có chắc chắn muốn hủy lịch hẹn #${booking?.bookingId} ?`}
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <GTextFieldNormal
                                        multiline={true}
                                        label={"Lý do"}
                                        formik={formik}
                                        fullWidth
                                        name={"note"}
                                        onChange={formik.handleChange}
                                        value={formik.values.note}
                                        InputLabelProps={{ shrink: true }}
                                        rows={3}
                                        placeholder={
                                            "Vui lòng nhập lý do hủy lịch hẹn của bạn ..."
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <GButton
                                        disabled={formik.isSubmitting}
                                        color={"error"}
                                        type={"submit"}
                                    >
                                        Xác nhận
                                    </GButton>
                                    <GButton
                                        color={"text"}
                                        style={{ marginLeft: "12px" }}
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </GButton>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </GModal>
        </>
    );
}

export default ConfirmCancelBookingPopup;
