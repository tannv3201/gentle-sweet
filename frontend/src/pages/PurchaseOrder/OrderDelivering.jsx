import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderDelivering({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderDelivering;
