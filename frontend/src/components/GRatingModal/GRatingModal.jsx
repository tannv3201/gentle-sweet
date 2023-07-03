import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames/bind";
import styles from "./GRatingModal.module.scss";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GModal from "../GModal/GModal";
import { API_IMAGE_URL } from "../../LocalConstants";
import GTextFieldNormal from "../GTextField/GTextFieldNormal";
import GButton from "../MyButton/MyButton";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createRating } from "../../redux/api/apiRating";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";

const cx = classNames.bind(styles);

const labels = {
    1: "Tệ",
    2: "Không tốt",
    3: "Trung bình",
    4: "Tốt",
    5: "Tuyệt vời",
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function GRatingModal({
    quantitylabel = false,
    isOpen,
    handleClose,
    handleOpen,
    title,
    ratingObject,
    isProduct = false,
    isService = false,
    invoiceId,
    bookingId,
}) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [hover, setHover] = React.useState(-1);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleRatingSubmit = async (data) => {
        await createRating(user?.accessToken, dispatch, data, axiosJWT);
        handleClose();
    };

    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: { rating: 5, comment: "" },
        // validationSchema: validationSchema,
        onSubmit: async (data) => {
            let ratingData;
            if (isProduct) {
                ratingData = {
                    ...data,
                    product_id: ratingObject?.product_id,
                    customer_user_id: user?.id,
                    invoice_id: invoiceId,
                };
            }

            if (isService) {
                ratingData = {
                    ...data,
                    service_id: ratingObject?.service_id,
                    customer_user_id: user?.id,
                    booking_id: bookingId,
                };
            }
            // console.log(ratingData);
            await handleRatingSubmit(ratingData);
        },
    });

    const [rating, setRating] = React.useState(5);

    const handleChangeRating = (value) => {
        setRating(value);
        formik.setFieldValue("rating", value);
    };
    return (
        <GModal
            isOpen={isOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
            title={title}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className={cx("wrapper")}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className={cx("object-info")}>
                                    <div className={cx("object-image")}>
                                        <img
                                            src={`${API_IMAGE_URL}/${ratingObject?.image_url}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx("object-name")}>
                                        {isProduct
                                            ? ratingObject?.product_name
                                            : isService
                                            ? ratingObject?.service_name
                                            : ""}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={cx("rating-wrapper")}>
                                    <div className={cx("rating-star")}>
                                        <span
                                            className={
                                                isMedium
                                                    ? cx(
                                                          "label-rating-star",
                                                          "isSmall"
                                                      )
                                                    : cx("label-rating-star")
                                            }
                                        >
                                            Đánh giá:
                                        </span>
                                        <Rating
                                            size="small"
                                            name="hover-feedback"
                                            value={rating}
                                            precision={1}
                                            style={{ marginRight: 4 }}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                handleChangeRating(newValue);
                                            }}
                                            onChangeActive={(
                                                event,
                                                newHover
                                            ) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={
                                                <StarIcon
                                                    style={{ opacity: 0.55 }}
                                                    fontSize="small"
                                                />
                                            }
                                        />
                                    </div>
                                    <div className={cx("rating-comment")}>
                                        <GTextFieldNormal
                                            label={"Bình luận"}
                                            value={formik.values?.comment}
                                            name="comment"
                                            onChange={formik.handleChange}
                                            fullWidth
                                            multiline={true}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={cx("btn-group")}>
                                    <GButton
                                        color={"text"}
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </GButton>
                                    <GButton type={"submit"}>Đánh giá</GButton>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Box>
        </GModal>
    );
}
