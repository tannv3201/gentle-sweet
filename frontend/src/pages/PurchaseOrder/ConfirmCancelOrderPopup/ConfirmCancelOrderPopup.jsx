import React from "react";
import GButton from "../../../components/MyButton/MyButton";
import GModal from "../../../common/GModal/GModal";
import { useFormik } from "formik";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { cancelInvoice, updateInvoice } from "../../../redux/api/apiInvoice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function ConfirmCancelOrderPopup({ handleClose, handleOpen, isOpen, invoice }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const validationSchema = Yup.object().shape({
        note: Yup.string().required("Vui lòng nhập lý do"),
    });

    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCancelInvoice = async (data, msg) => {
        await updateInvoice(
            user?.accessToken,
            dispatch,
            invoice?.invoiceId,
            data,
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
            if (invoice?.status < 3) {
                status = 6;
                msg = "Hủy đơn hàng thành công";
            } else if (invoice?.status === 3) {
                status = 7;
                msg = "Gửi yêu cầu hủy đơn hàng thành công";
            }
            await handleCancelInvoice({ ...data, status: status }, msg);
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
                title={"Xác nhận hủy đơn hàng"}
            >
                <div>
                    <div
                        style={isSmall ? {} : { padding: "12px 0", width: 400 }}
                    >
                        {` Bạn có chắc chắn muốn hủy đơn hàng #${invoice?.invoiceId} ?`}
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
                                            "Vui lòng nhập lý do hủy đơn hàng của bạn ..."
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <GButton color={"error"} type={"submit"}>
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

export default ConfirmCancelOrderPopup;
