import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PurchaseOrder.module.scss";
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
import { getAllInvoiceByUser } from "../../redux/api/apiInvoice";
import { GFormatDate } from "../../components/GDatePicker/GDatePicker";
import { getInvoiceDetailByInvoiceId } from "../../redux/api/apiInvoiceDetail";
import { getProductById } from "../../redux/api/apiProduct";
import OrderAll from "./OrderAll";
import OrderPending from "./OrderPending";
import OrderReceived from "./OrderReceived";
import OrderCancel from "./OrderPending";
import { toast } from "react-hot-toast";
import OrderProductWaiting from "./OrderProductWaiting";
import OrderDelivering from "./OrderDelivering";
import OrderDelivered from "./OrderDelivered";
import OrderCancelPending from "./OrderCancelPending";

const cx = classNames.bind(styles);

function PurchaseOrder() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    // const getInvoiceListByUser = useSelector(
    //     (state) => state.invoice.invoice.invoiceListByUser
    // );
    const navigate = useNavigate();
    const [invoiceList, setInvoiceList] = useState([]);
    const [invoiceListStatus1, setInvoiceListStatus1] = useState([]);
    const [invoiceListStatus2, setInvoiceListStatus2] = useState([]);
    const [invoiceListStatus3, setInvoiceListStatus3] = useState([]);
    const [invoiceListStatus4, setInvoiceListStatus4] = useState([]);
    const [invoiceListStatus5, setInvoiceListStatus5] = useState([]);
    const [invoiceListStatus6, setInvoiceListStatus6] = useState([]);
    const [invoiceListStatus7, setInvoiceListStatus7] = useState([]);
    const invoiceDetailList = [];
    const productInvoiceDetail = [];
    const [getInvoiceListByUser, setGetInvoiceListByUser] = useState([]);
    useState(() => {
        const fetch = async () => {
            if (!user) {
                navigate("/dang-nhap");
                toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                    icon: "😅",
                });
            }
            const res = await getAllInvoiceByUser(
                user?.id,
                user?.accessToken,
                dispatch,
                axiosJWT
            );

            setGetInvoiceListByUser(res);
        };
        fetch();
    }, [user?.id]);

    // useEffect(() => {
    //     const fetch = async () => {
    //         if (getInvoiceListByUser) {
    //             const newInvoiceList = getInvoiceListByUser?.map((i) => {
    //                 const list = {
    //                     ...i,
    //                     created_at: GFormatDate(i?.created_at, "DD-MM-YYYY"),
    //                     status_name:
    //                         i?.status === 5
    //                             ? "Đã hủy"
    //                             : i?.status === 1
    //                             ? "Chờ xác nhận"
    //                             : i?.status === 2
    //                             ? "Đã xác nhận"
    //                             : i?.status === 3
    //                             ? "Đang giao hàng"
    //                             : i?.status === 4
    //                             ? "Đã giao hàng"
    //                             : "",
    //                 };
    //                 return list;
    //             });
    //             for (const item of newInvoiceList) {
    //                 const detail = await getInvoiceDetailByInvoiceId(
    //                     dispatch,
    //                     item?.id,
    //                     user?.accessToken,
    //                     axiosJWT
    //                 );

    //                 invoiceDetailList.push(detail);
    //             }

    //             for (const item of invoiceDetailList.flat()) {
    //                 const product = await getProductById(
    //                     dispatch,
    //                     item?.product_id,
    //                     user?.accessToken,
    //                     axiosJWT
    //                 );
    //                 productInvoiceDetail.push(product);
    //             }
    //             const proList = newInvoiceList?.map((invoice) => {
    //                 const detailList = invoiceDetailList
    //                     ?.flat()
    //                     .filter((d) => parseInt(d?.invoice_id) === invoice?.id);
    //                 const filterProductDetail = detailList?.map((detail) => {
    //                     const product = productInvoiceDetail?.find(
    //                         (p) => p?.id === detail?.product_id
    //                     );

    //                     return {
    //                         ...detail,
    //                         image_url: product ? product.image_url : null,
    //                         product_name: product ? product.name : null,
    //                     };
    //                 });

    //                 return {
    //                     ...invoice,
    //                     detailList: filterProductDetail,
    //                 };
    //             });
    //             setInvoiceList(structuredClone(proList));

    //             // find invoice status = 1: chờ xác nhận
    //             const invoiceStatus1 = proList?.filter((i) => i?.status === 1);
    //             setInvoiceListStatus1(invoiceStatus1);

    //             // find invoice status = 2: Đã xác nhận
    //             const invoiceStatus2 = proList?.filter((i) => i?.status === 2);
    //             setInvoiceListStatus2(invoiceStatus2);

    //             // find invoice status = 5: Đã hủy
    //             const invoiceStatus5 = proList?.filter((i) => i?.status === 5);
    //             setInvoiceListStatus5(invoiceStatus5);
    //         }
    //     };
    //     fetch();
    // }, [getInvoiceListByUser]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate("/dang-nhap");
                toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                    icon: "😅",
                });
            }
            if (getInvoiceListByUser) {
                const newInvoiceList = getInvoiceListByUser?.map((i) => {
                    const list = {
                        ...i,
                        created_at: GFormatDate(i?.created_at, "DD-MM-YYYY"),
                        status_name:
                            i?.status === 1
                                ? "Chờ tiếp nhận"
                                : i?.status === 2
                                ? "Đã tiếp nhận"
                                : i?.status === 3
                                ? "Chờ lấy hàng"
                                : i?.status === 4
                                ? "Đang vận chuyển"
                                : i?.status === 5
                                ? "Đã giao"
                                : i?.status === 6
                                ? "Đã hủy"
                                : i?.status === 7
                                ? "Yêu cầu hủy đơn"
                                : "",
                    };
                    return list;
                });

                const invoiceIds = newInvoiceList.map((item) => item?.id);

                const invoiceDetailsPromise = invoiceIds.map((id) =>
                    getInvoiceDetailByInvoiceId(
                        dispatch,
                        id,
                        user?.accessToken,
                        axiosJWT
                    )
                );

                const invoiceDetails = await Promise.all(invoiceDetailsPromise);

                const productIds = invoiceDetails
                    .flat()
                    .map((item) => item?.product_id);

                const productsPromise = productIds.map((id) =>
                    getProductById(dispatch, id, user?.accessToken, axiosJWT)
                );

                const products = await Promise.all(productsPromise);

                const proList = newInvoiceList.map((invoice) => {
                    const detailList = invoiceDetails
                        .flat()
                        .filter((d) => parseInt(d?.invoice_id) === invoice?.id);

                    const filterProductDetail = detailList.map((detail) => {
                        const product = products.find(
                            (p) => p?.id === detail?.product_id
                        );

                        return {
                            ...detail,
                            image_url: product ? product.image_url : null,
                            product_name: product ? product.name : null,
                        };
                    });

                    return {
                        ...invoice,
                        detailList: filterProductDetail,
                    };
                });

                setInvoiceList(structuredClone(proList));

                const invoiceStatus1 = proList.filter((i) => i?.status === 1);
                setInvoiceListStatus1(invoiceStatus1);

                const invoiceStatus2 = proList.filter((i) => i?.status === 2);
                setInvoiceListStatus2(invoiceStatus2);

                const invoiceStatus3 = proList.filter((i) => i?.status === 3);
                setInvoiceListStatus3(invoiceStatus3);

                const invoiceStatus4 = proList.filter((i) => i?.status === 4);
                setInvoiceListStatus4(invoiceStatus4);

                const invoiceStatus5 = proList.filter((i) => i?.status === 5);
                setInvoiceListStatus5(invoiceStatus5);

                const invoiceStatus6 = proList.filter((i) => i?.status === 6);
                setInvoiceListStatus6(invoiceStatus6);

                const invoiceStatus7 = proList.filter((i) => i?.status === 7);
                setInvoiceListStatus7(invoiceStatus7);
            }
        };

        fetchData();
    }, [getInvoiceListByUser]);

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
                            <Tab label="Chờ lấy hàng" value="4" />
                            <Tab label="Đang vận chuyển" value="5" />
                            <Tab label="Đã giao" value="6" />
                            <Tab label="Đã hủy" value="7" />
                            <Tab label="Yêu cầu hủy đơn" value="8" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <OrderAll invoiceListByUser={invoiceList} />
                    </TabPanel>
                    <TabPanel value="2">
                        <OrderPending invoiceListByUser={invoiceListStatus1} />
                    </TabPanel>
                    <TabPanel value="3">
                        <OrderReceived invoiceListByUser={invoiceListStatus2} />
                    </TabPanel>
                    <TabPanel value="4">
                        <OrderProductWaiting
                            invoiceListByUser={invoiceListStatus3}
                        />
                    </TabPanel>
                    <TabPanel value="5">
                        <OrderDelivering
                            invoiceListByUser={invoiceListStatus4}
                        />
                    </TabPanel>
                    <TabPanel value="6">
                        <OrderDelivered
                            invoiceListByUser={invoiceListStatus5}
                        />
                    </TabPanel>
                    <TabPanel value="7">
                        <OrderCancel invoiceListByUser={invoiceListStatus6} />
                    </TabPanel>
                    <TabPanel value="8">
                        <OrderCancelPending
                            invoiceListByUser={invoiceListStatus7}
                        />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

export default PurchaseOrder;
