import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./BookedSchedule.module.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GFormatDate } from "../../components/GDatePicker/GDatePicker";
import BookedAll from "./BookedAll";
import BookedPending from "./BookedPending";
import BookedReceived from "./BookedReceived";
import BookedCancel from "./BookedPending";
import { toast } from "react-hot-toast";
import { getAllBookingByUser } from "../../redux/api/apiBooking";
import { getBookingDetailByBookingId } from "../../redux/api/apiBookingDetail";
import { getServiceById } from "../../redux/api/apiService";
import BookedScheduled from "./BookedScheduled";
import ServiceStart from "./ServiceStart";
import ServiceEnd from "./ServiceEnd";
import BookedCancelPending from "./BookedCancelPending";

const cx = classNames.bind(styles);

function BookedSchedule() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const navigate = useNavigate();
    const [bookingList, setBookingList] = useState([]);
    const [bookingListStatus1, setBookingListStatus1] = useState([]);
    const [bookingListStatus2, setBookingListStatus2] = useState([]);
    const [bookingListStatus3, setBookingListStatus3] = useState([]);
    const [bookingListStatus4, setBookingListStatus4] = useState([]);
    const [bookingListStatus5, setBookingListStatus5] = useState([]);
    const [bookingListStatus6, setBookingListStatus6] = useState([]);
    const [bookingListStatus7, setBookingListStatus7] = useState([]);
    const [getBookingListByUser, setGetBookingListByUser] = useState([]);

    useEffect(() => {
        document.title = "Quản lý lịch hẹn";
    }, []);

    useState(() => {
        const fetch = async () => {
            if (!user) {
                navigate("/dang-nhap");
                toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                    icon: "😅",
                });
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
                toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                    icon: "😅",
                });
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
                const bookingStatus1 = finalList.filter((i) => i?.status === 1);
                setBookingListStatus1(bookingStatus1);

                // find booking status = 2: Đã xác nhận
                const bookingStatus2 = finalList.filter((i) => i?.status === 2);
                setBookingListStatus2(bookingStatus2);

                const bookingStatus3 = finalList.filter((i) => i?.status === 3);
                setBookingListStatus3(bookingStatus3);

                const bookingStatus4 = finalList.filter((i) => i?.status === 4);
                setBookingListStatus4(bookingStatus4);

                // find booking status = 5: Đã hủy
                const bookingStatus5 = finalList.filter((i) => i?.status === 5);
                setBookingListStatus5(bookingStatus5);

                // find booking status = 5: Đã hủy
                const bookingStatus6 = finalList.filter((i) => i?.status === 6);
                setBookingListStatus6(bookingStatus6);

                // find booking status = 5: Đã hủy
                const bookingStatus7 = finalList.filter((i) => i?.status === 7);
                setBookingListStatus7(bookingStatus7);
            } else {
                setBookingList([]);
            }
        };

        fetchData();
    }, [getBookingListByUser]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            textColor="inherit"
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Tất cả" value="1" />
                            <Tab label="Chờ tiếp nhận" value="2" />
                            <Tab label="Đã tiếp nhận" value="3" />
                            <Tab label="Đã lên lịch" value="4" />
                            <Tab label="Bắt đầu dịch vụ" value="5" />
                            <Tab label="Đã hoàn thành" value="6" />
                            <Tab label="Đã hủy" value="7" />
                            <Tab label="Yêu cầu hủy lịch hẹn" value="8" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <BookedAll bookingListByUser={bookingList} />
                    </TabPanel>
                    <TabPanel value="2">
                        <BookedPending bookingListByUser={bookingListStatus1} />
                    </TabPanel>
                    <TabPanel value="3">
                        <BookedReceived
                            bookingListByUser={bookingListStatus2}
                        />
                    </TabPanel>
                    <TabPanel value="4">
                        <BookedScheduled
                            bookingListByUser={bookingListStatus3}
                        />
                    </TabPanel>
                    <TabPanel value="5">
                        <ServiceStart bookingListByUser={bookingListStatus4} />
                    </TabPanel>
                    <TabPanel value="6">
                        <ServiceEnd bookingListByUser={bookingListStatus5} />
                    </TabPanel>
                    <TabPanel value="7">
                        <BookedCancel bookingListByUser={bookingListStatus6} />
                    </TabPanel>
                    <TabPanel value="8">
                        <BookedCancelPending
                            bookingListByUser={bookingListStatus7}
                        />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

export default BookedSchedule;
