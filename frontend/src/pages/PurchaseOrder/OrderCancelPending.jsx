import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderCancelPending({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderCancelPending;
