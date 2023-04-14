import React from "react";
import styles from "./Comments.module.scss";
import classnames from "classnames/bind";
import { Grid } from "@mui/material";
import GTextField from "../MyTextField/GTextField";
import GTextArea from "../Form/GTextArea";
import { RequiredLabel } from "../MyTextField/GTextField";
import { InsertPhotoRounded, SendRounded } from "@mui/icons-material";
import GButton from "../MyButton/MyButton";

const cx = classnames.bind(styles);

function Comments() {
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
                            <h3>Hãy để lại bình luận của bạn tại đây</h3>
                        </span>
                        <p className={cx("section-comment-description")}>
                            Email của bạn sẽ không được hiển thị công khai. Các
                            trường bắt buộc đánh dấu <RequiredLabel />
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("user-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={cx("comments-wrapper")}>
                                        <div
                                            className={cx("comments-textarea")}
                                        >
                                            <GTextArea
                                                rows={"6"}
                                                label={"Bình luận"}
                                                id={"comment-textarea"}
                                                requiredlabel
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <GTextField
                                        label="Họ và tên"
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <GTextField label="Email" fullWidth />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <GTextField
                                        label="Số điện thoại"
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("action")}>
                                        <GButton
                                            variant="contained"
                                            component="label"
                                            startIcon={<InsertPhotoRounded />}
                                        >
                                            Đính kèm ảnh
                                            <input
                                                hidden
                                                accept="image/*"
                                                multiple
                                                type="file"
                                            />
                                        </GButton>
                                        <GButton
                                            variant="contained"
                                            component="label"
                                            startIcon={<SendRounded />}
                                        >
                                            Gửi
                                        </GButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("user-comment-list")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span className={cx("comment-count")}>
                                        <span>3</span> bình luận
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("user-comment")}>
                                        <div
                                            className={cx("user-info-comment")}
                                        >
                                            <div className={cx("avatar")}>
                                                H
                                            </div>
                                            <span className={cx("name")}>
                                                Hien Le
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
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Atque optio reiciendis
                                                    animi possimus ratione
                                                    officiis voluptas vel autem
                                                    obcaecati voluptatum sunt
                                                    deserunt at iusto quod
                                                    architecto, esse ex dolores
                                                    rerum.
                                                </p>
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
                                                    14/04/2023 AT 17:12
                                                </span>
                                                <GButton>Trả lời</GButton>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("user-comment")}>
                                        <div
                                            className={cx("user-info-comment")}
                                        >
                                            <div className={cx("avatar")}>
                                                H
                                            </div>
                                            <span className={cx("name")}>
                                                Hien Le
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
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Atque optio reiciendis
                                                    animi possimus ratione
                                                    officiis voluptas vel autem
                                                    obcaecati voluptatum sunt
                                                    deserunt at iusto quod
                                                    architecto, esse ex dolores
                                                    rerum.
                                                </p>
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
                                                    14/04/2023 AT 17:12
                                                </span>
                                                <GButton>Trả lời</GButton>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("user-comment")}>
                                        <div
                                            className={cx("user-info-comment")}
                                        >
                                            <div className={cx("avatar")}>
                                                H
                                            </div>
                                            <span className={cx("name")}>
                                                Hien Le
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
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Atque optio reiciendis
                                                    animi possimus ratione
                                                    officiis voluptas vel autem
                                                    obcaecati voluptatum sunt
                                                    deserunt at iusto quod
                                                    architecto, esse ex dolores
                                                    rerum.
                                                </p>
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
                                                    14/04/2023 AT 17:12
                                                </span>
                                                <GButton>Trả lời</GButton>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Comments;
