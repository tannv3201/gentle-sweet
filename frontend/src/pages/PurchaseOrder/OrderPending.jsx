import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderCancel({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderCancel;
