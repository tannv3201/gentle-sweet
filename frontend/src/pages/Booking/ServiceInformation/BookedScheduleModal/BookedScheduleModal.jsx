import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import GModal from "../../../../components/GModal/GModal";
import BookedSchedule from "../../../BookedSchedule/BookedSchedule";
import { useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllBookingByUser } from "../../../../redux/api/apiBooking";
import { GFormatDate } from "../../../../components/GDatePicker/GDatePicker";
import { getBookingDetailByBookingId } from "../../../../redux/api/apiBookingDetail";
import { getServiceById } from "../../../../redux/api/apiService";
import styles from "./BookedScheduleModal.module.scss";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

function GroupItem({ label, content }) {
    return (
        <div className={cx("group-item-wrapper")}>
            <span className={cx("group-item-label")}>{label}</span>
            <span className={cx("group-item-content")}>{content}</span>
        </div>
    );
}

function BookedScheduleModal({ isOpen, handleClose, handleOpen }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const navigate = useNavigate();
    const [bookingList, setBookingList] = useState([]);
    const [bookedList, setBookedList] = useState([]);

    const [getBookingListByUser, setGetBookingListByUser] = useState([]);

    useState(() => {
        const fetch = async () => {
            if (!user) {
                navigate("/dang-nhap");
                // toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                //     icon: "😅",
                // });
            }
            const res = await getAllBookingByUser(
                user?.id,
                user?.accessToken,
                dispatch,
                axiosJWT
            );
            setGetBookingListByUser(res);
        };
        fetch();
    }, [user?.id]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
            }
            if (getBookingListByUser) {
                const newBookingList = getBookingListByUser?.map((i) => {
                    const list = {
                        ...i,
                        created_at: GFormatDate(
                            i?.created_at,
                            "DD-MM-YYYY | HH:mm"
                        ),
                        status_name:
                            i?.status === 1
                                ? "Chờ tiếp nhận"
                                : i?.status === 2
                                ? "Đã tiếp nhận"
                                : i?.status === 3
                                ? "Đã lên lịch"
                                : i?.status === 4
                                ? "Bắt đầu dịch vụ"
                                : i?.status === 5
                                ? "Đã hoàn thành"
                                : i?.status === 6
                                ? "Đã hủy"
                                : i?.status === 7
                                ? "Yêu cầu hủy lịch hẹn"
                                : "",
                    };
                    return list;
                });

                const bookingIds = newBookingList.map((item) => item?.id);

                const bookingDetailsPromise = bookingIds?.map((id) =>
                    getBookingDetailByBookingId(
                        dispatch,
                        id,
                        user?.accessToken,
                        axiosJWT
                    )
                );

                const bookingDetails = await Promise.all(bookingDetailsPromise);

                const serviceIds = bookingDetails
                    .flat()
                    .map((item) => item?.service_id);
                const productsPromise = serviceIds.map((id) =>
                    getServiceById(dispatch, id, user?.accessToken, axiosJWT)
                );

                const services = await Promise.all(productsPromise);

                const finalList = newBookingList.map((booking) => {
                    const detailList = bookingDetails
                        .flat()
                        .filter((d) => parseInt(d?.booking_id) === booking?.id);

                    const filterServiceDetail = detailList.map(
                        (serviceDetail) => {
                            const service = services.find(
                                (p) => p?.id === serviceDetail?.service_id
                            );

                            return {
                                ...serviceDetail,
                                booking_time:
                                    serviceDetail?.start_time +
                                    " - " +
                                    serviceDetail?.end_time,
                                image_url: service ? service.image_url : null,
                                service_name: service ? service.name : null,
                            };
                        }
                    );

                    return {
                        ...booking,
                        detailList: filterServiceDetail,
                    };
                });

                setBookingList(structuredClone(finalList));

                // find booking status = 1: chờ xác nhận
                const filterBookedList = finalList.filter(
                    (i) => i?.status !== 6 && i?.status !== 7
                );
                setBookedList(filterBookedList);
            } else {
                setBookingList([]);
            }
        };

        fetchData();
    }, [getBookingListByUser]);

    return (
        <div>
            <GModal
                isOpen={isOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                title={"Dịch vụ đã đặt"}
                maxHeight={isSmall ? "460px" : "400px"}
            >
                <div>
                    {bookedList?.length !== 0 ? (
                        <div className={cx("wrapper")}>
                            <div className={cx("inner")}>
                                <Grid container spacing={2}>
                                    {bookedList?.map((booking, idx) => (
                                        <Grid key={booking?.id} item xs={12}>
                                            <div className={cx("booking-item")}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "booking-item-header"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "col-left"
                                                                )}
                                                            >
                                                                <h4
                                                                    className={cx(
                                                                        "service-name"
                                                                    )}
                                                                >
                                                                    {
                                                                        booking
                                                                            ?.detailList[0]
                                                                            ?.service_name
                                                                    }
                                                                </h4>
                                                                <GroupItem
                                                                    label={
                                                                        "Thời gian tạo: "
                                                                    }
                                                                    content={
                                                                        booking?.created_at
                                                                    }
                                                                />
                                                                <GroupItem
                                                                    label={
                                                                        "Chi nhánh: "
                                                                    }
                                                                    content={
                                                                        booking?.branch_name
                                                                    }
                                                                />
                                                                <GroupItem
                                                                    label={
                                                                        "Ngày đặt: "
                                                                    }
                                                                    content={GFormatDate(
                                                                        booking
                                                                            ?.detailList[0]
                                                                            ?.date,
                                                                        "DD-MM-YYYY"
                                                                    )}
                                                                />
                                                                <GroupItem
                                                                    label={
                                                                        "Khung giờ: "
                                                                    }
                                                                    content={`${booking?.detailList[0]?.start_time} - ${booking?.detailList[0]?.end_time}`}
                                                                />

                                                                <div
                                                                    className={cx(
                                                                        "booking-item-status"
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={cx(
                                                                            "status-label"
                                                                        )}
                                                                    >
                                                                        Trạng
                                                                        thái:{" "}
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            booking?.status ===
                                                                            1
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "pending"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  2
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "received"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  3
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "scheduled"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  4
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "service-start"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  5
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "service-end"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  6
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "cancel"
                                                                                  )
                                                                                : booking?.status ===
                                                                                  7
                                                                                ? cx(
                                                                                      "status-content",
                                                                                      "cancel-pending"
                                                                                  )
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {
                                                                            booking?.status_name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}></Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    ) : (
                        <div className={cx("no-booking")}>
                            Không có lịch hẹn
                        </div>
                    )}
                </div>
            </GModal>
        </div>
    );
}

export default BookedScheduleModal;
