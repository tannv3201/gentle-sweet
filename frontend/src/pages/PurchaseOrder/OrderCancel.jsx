import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderReceived({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderReceived;
