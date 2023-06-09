import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderPending({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderPending;
