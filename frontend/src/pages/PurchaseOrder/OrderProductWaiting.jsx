import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderProductWaiting({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderProductWaiting;
