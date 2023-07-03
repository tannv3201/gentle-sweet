import React from "react";
import styles from "./Comments.module.scss";
import classnames from "classnames/bind";
import { Grid, Rating } from "@mui/material";
import GTextField from "../GTextField/GTextField";
import GTextArea from "../Form/GTextArea";
import { RequiredLabel } from "../GTextField/GTextField";
import { InsertPhotoRounded, SendRounded } from "@mui/icons-material";
import GButton from "../MyButton/MyButton";
import GRating from "../GRatingModal/GRatingModal";
import { GFormatDate } from "../../components/GDatePicker/GDatePicker";

const cx = classnames.bind(styles);

function Comments({ ratingList }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <hr
                    style={{
                        borderTop: "1px solid #eee",
                        marginBottom: "24px",
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <span className={cx("section-comment-title")}>
                            <h3>Đánh giá của khách hàng</h3>
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={cx("user-comment-list")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span className={cx("comment-count")}>
                                        <span>{ratingList?.length}</span> bình
                                        luận
                                    </span>
                                </Grid>
                                {ratingList?.map((rating, idx) => (
                                    <Grid key={idx} item xs={12}>
                                        <div className={cx("user-comment")}>
                                            <div
                                                className={cx(
                                                    "user-info-comment"
                                                )}
                                            >
                                                <div className={cx("avatar")}>
                                                    {rating?.first_name?.charAt(
                                                        0
                                                    )}
                                                </div>
                                                <span className={cx("name")}>
                                                    {rating?.last_name +
                                                        " " +
                                                        rating?.first_name}
                                                </span>
                                            </div>
                                            <div
                                                className={cx(
                                                    "user-content-comment-wrapper"
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        "user-content-comment"
                                                    )}
                                                >
                                                    <Rating
                                                        readOnly
                                                        value={rating?.rating}
                                                    />
                                                    <p>{rating?.comment}</p>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "user-footer-comment"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "user-time-comment"
                                                        )}
                                                    >
                                                        {GFormatDate(
                                                            rating?.created_at,
                                                            "DD-MM-YYYY | HH:mm"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Comments;
